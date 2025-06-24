'use client';

import { Button, TextArea } from '@apideck/components'
import { useState } from 'react'
import { chatMessages } from '@/components/ChatMessageWrapper'
import useToolsStore from "@/stores/useToolsStore";

const ChatFormRag = () => {
  const [content, setContent] = useState('')
  const { vectorStore, setVectorStore } = useToolsStore();
  const { addChatMessage } = chatMessages()

  const handleSubmit = async (formData: FormData, e?: any) => {
    e?.preventDefault()

    const mapOfFormDataBasic = {
      content: content,
      role: 'user',
      model: 'gpt-4.1',
      temperature: '1',
      vectorStoreId: vectorStore?.id
    }

    console.log(JSON.stringify(mapOfFormDataBasic))

    addChatMessage(mapOfFormDataBasic)
    setContent('')

  }

  return (
    <>

      <div className='chat-text-area-wrapper'>
        <form id='rag-chat-form' action={handleSubmit}>

          <div className='m-[8px]'>

            <div>
              <TextArea
                id="my-text-area-rag"
                name="content"
                placeholder="Enter your message here..."
                rows={4}
                value={content}
                autoFocus
                className="!p-3 text-gray-300 focus:outline-none focus:ring-1"
                onChange={(e: any) => setContent(e.target.value)}
              />
            </div>
            <div>
              <div className='grid grid-flow-col justify-items-end'>
                <div className='m-[2px]'>
                  {/* <button className="btn btn-xs btn-primary">Send</button> */}
                  <button className="btn btn-sm btn-primary">
                    send
                  </button>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default ChatFormRag
