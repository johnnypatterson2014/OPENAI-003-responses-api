'use client';

import { Button, TextArea } from '@apideck/components'
import { useState } from 'react'
// import { sendSpringMessage } from 'utils/sendSpringMessage'
import { chatMessages } from '@/components/ChatMessageWrapper'
import { Input } from "@/components/ui/input";
import FeskButtonPrimarySubmit from '@/components/FeskButtonPrimarySubmit';

const ChatFormMcp = () => {
  const [content, setContent] = useState('Which tools are supported?')
  const { addChatMessage } = chatMessages()

  const handleSubmit = async (formData: FormData, e?: any) => {
    e?.preventDefault()

    const mapOfFormDataBasic = {
      content: content,
      role: 'user',
      model: 'gpt-4.1',
      temperature: '1',
      mcpServerLabel: formData.get("server_label"),
      mcpServerUrl: formData.get("server_url"),
      websearchEnabled: false,
      vectorStoreId: null
    }

    console.log(JSON.stringify(mapOfFormDataBasic))

    addChatMessage(mapOfFormDataBasic)
    setContent('')

  }

  return (
    <>

      <div className='chat-text-area-wrapper'>
        <form id='rag-chat-form' action={handleSubmit}>


          <div>
            <div className="flex items-center justify-between">
              <div className="text-zinc-300 text-sm">Server details</div>
            </div>
            <div className="mt-3 space-y-3 text-zinc-400">
              <div className="flex items-start gap-2">
                <label htmlFor="server_label" className="text-sm w-24 mt-[8px]">
                  Label
                </label>
                <Input
                  id="server_label"
                  name="server_label"
                  type="text"
                  className="bg-zinc-900 border border-zinc-600 text-sm flex-1 text-zinc-300"
                  value='deepwiki'
                  readOnly
                />
              </div>
              <div className="flex items-start gap-2">
                <label htmlFor="server_url" className="text-sm w-24 mt-[8px]">
                  URL
                </label>
                <Input
                  id="server_url"
                  name="server_url"
                  type="text"
                  className="bg-zinc-900 border border-zinc-600 text-sm flex-1 text-zinc-300"
                  value="https://mcp.deepwiki.com/mcp"
                  readOnly
                />
              </div>
              <div className="flex items-start gap-2">
                <label htmlFor="server_url" className="text-sm w-24 mt-[8px]">
                  Prompt
                </label>
                <TextArea
                  id="my-text-area-rag2"
                  name="content"
                  placeholder="Enter your message here..."
                  rows={4}
                  value={content}
                  autoFocus
                  className="!p-3 text-zinc-300 bg-zinc-900 border border-zinc-600 text-sm focus:outline-none focus:ring-1 flex-1"
                  onChange={(e: any) => setContent(e.target.value)}
                />

              </div>

              <div>
                <div className='grid grid-flow-col justify-items-end'>
                  <div className='m-[2px]'>
                    <FeskButtonPrimarySubmit label='Send' />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </form >

      </div >
    </>
  )
}

export default ChatFormMcp
