'use client';

// import ChatCompletionRequestMessage from 'openai'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { sendChatRequest } from '@/lib/sendChatRequest'
import { sendChatHistoryRequest } from '@/lib/sendChatHistoryRequest'
import { remark } from 'remark';
import html from 'remark-html';

export interface ChatMessage {
  role: string
  content: string
  htmlContent?: string
  responseMessageId?: string
  previousResponseId?: string
  model?: string
  temperature?: string
  websearchEnabled?: boolean,
  vectorStoreId?: string,
  mcpServerLabel?: string,
  mcpServerUrl?: string
}

interface ContextProps {
  messages: ChatMessage[]
  addChatMessage: (formData: any) => Promise<void>
  isLoadingAnswer: boolean
  llmResponseList: any[]
  activeId: string
  setActiveResponseId: (content: string) => void
  getChatHistory: (content: string) => Promise<void>
  llmRequestResponseList: any[]
  activeRequestResponseId: string
}

const ChatsContext = createContext<Partial<ContextProps>>({})

const isLoadStubData = false;

export async function convertMarkdownToHtml(markdown: string) {
  const processedContent = await remark()
    .use(html)
    .process(markdown);
  return processedContent.toString();
}

export async function addHtmlToMessage(message: ChatMessage) {
  message.htmlContent = await convertMarkdownToHtml(message.content);
}

export function ChatMessageWrapper({ children, messagesArrayStub, llmResponseListStub }
  : { children: ReactNode, messagesArrayStub: any, llmResponseListStub: any }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)
  const [llmResponseList, setLlmResponseList] = useState<any[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [llmRequestResponseList, setLlmRequestResponseList] = useState<any[]>([])
  const [activeRequestResponseId, setActiveRequestResponseId] = useState<string>('')

  const setActiveResponseId = async (id: string) => {
    setActiveId(id)
  }

  const getChatHistory = async (responseMessageId: string) => {
    setIsLoadingAnswer(true)
    // call api to get response
    try {
      const data = await sendChatHistoryRequest(responseMessageId)
      // save to llmResponseList
      const mapOfData = {
        id: responseMessageId,
        content: data
      }
      setLlmRequestResponseList([...llmRequestResponseList, mapOfData])
      // setActiveId to the new response id
      setActiveRequestResponseId(responseMessageId)
    } finally {
      setIsLoadingAnswer(false)
    }
  }

  useEffect(() => {
    const initializeChat = (messagesArrayStub: any, llmResponseListStub: any) => {

      setMessages(JSON.parse(messagesArrayStub));
      setLlmResponseList(JSON.parse(llmResponseListStub));

    }

    if (isLoadStubData) {
      initializeChat(messagesArrayStub, llmResponseListStub)
    }

  }, [])

  const addChatMessage = async (mapData: any) => {
    setIsLoadingAnswer(true)
    let previous_response_id = '';
    console.log('ChatMessageWrapper model is: ' + mapData.model);
    console.log('ChatMessageWrapper role is: ' + mapData.role);
    if (llmResponseList.length > 0) {
      previous_response_id = llmResponseList.at(-1).id;
    };
    try {
      const newMessage: ChatMessage = {
        role: mapData.role,
        content: mapData.content,
        previousResponseId: previous_response_id,
        responseMessageId: '',
        model: mapData.model,
        temperature: mapData.temperature,
        websearchEnabled: mapData.websearchEnabled,
        vectorStoreId: mapData.vectorStoreId,
        mcpServerLabel: mapData.mcpServerLabel,
        mcpServerUrl: mapData.mcpServerUrl
      }
      const newMessages = [...messages, newMessage]

      // Add the user message to the state so we can see it immediately
      setMessages(newMessages)

      const data = await sendChatRequest(newMessage)
      setLlmResponseList([...llmResponseList, data])
      // console.log('reponse in chatMessageWrapper: ' + JSON.stringify(data));

      let replyText = '';
      if (mapData.vectorStoreId) {
        // replyText = await convertMarkdownToHtml(JSON.stringify(data.output[1].content[0].text));
        console.log('vectorStoreId | reply is: ' + data.output[1].content[0].text)
        replyText = data.output[1].content[0].text;
      } else if (mapData.websearchEnabled) {
        // replyText = await convertMarkdownToHtml(JSON.stringify(data.output[1].content[0].text));
        console.log('websearchEnabled | reply is: ' + data.output[1].content[0].text)
        replyText = data.output[1].content[0].text;
      } else if (mapData.mcpServerLabel) {
        // replyText = await convertMarkdownToHtml(JSON.stringify(data.output[1].content[0].text));
        console.log('mcpServerLabel | reply is: ' + data.output[1].content[0].text)
        replyText = data.output[1].content[0].text;
      } else {
        console.log('default | reply is: ' + data.output[0].content[0].text)
        replyText = data.output[0].content[0].text
      }
      const replyTextHtml = await convertMarkdownToHtml(replyText);
      // console.log('reply is: ' + reply)

      const responseMessage: ChatMessage = {
        role: 'assistant',
        content: replyText,
        htmlContent: replyTextHtml,
        responseMessageId: data.id,
        previousResponseId: data.id,
        websearchEnabled: mapData.websearchEnabled,
        vectorStoreId: mapData.vectorStoreId ? mapData.vectorStoreId : null,
        mcpServerLabel: mapData.mcpServerLabel ? mapData.mcpServerLabel : null,
        mcpServerUrl: mapData.mcpServerUrl ? mapData.mcpServerUrl : null
      }
      // console.log('assistant message is: ' + JSON.stringify(responseMessage))

      // Add the assistant message to the state
      setMessages([...newMessages, responseMessage])
    } catch (error) {
      // Show error when something goes wrong
      // addToast({ title: 'An error occurred', type: 'error' })
    } finally {
      setIsLoadingAnswer(false)
    }
  }

  return (
    <ChatsContext.Provider value={{ messages, addChatMessage, isLoadingAnswer, llmResponseList, activeId, setActiveResponseId, getChatHistory, llmRequestResponseList, activeRequestResponseId }}>
      {children}
    </ChatsContext.Provider>
  )
}

export const chatMessages = () => {
  return useContext(ChatsContext) as ContextProps
}

