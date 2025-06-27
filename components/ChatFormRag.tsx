'use client';

import { Button, TextArea } from '@apideck/components'
import { useState } from 'react'
import { chatMessages } from '@/components/ChatMessageWrapper'
import useToolsStore from "@/stores/useToolsStore";
import FeskButtonPrimarySubmit from '@/components/FeskButtonPrimarySubmit';

const svgIconSend = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>);

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

          <div className='m-[0px]'>

            <div>
              <TextArea
                id="my-text-area-rag"
                name="content"
                placeholder="Enter your message here..."
                rows={4}
                value={content}
                autoFocus
                className="bg-zinc-900 border border-zinc-600 text-zinc-300 focus:outline-none focus:ring-1"
                onChange={(e: any) => setContent(e.target.value)}
              />
            </div>
            <div className='mt-[8px] mb-[8px]'>
              <div className='grid grid-flow-col justify-items-end'>
                <div className='m-[2px]'>
                  <FeskButtonPrimarySubmit label='Send' />
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
