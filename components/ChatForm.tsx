'use client';

import { Button, TextArea } from '@apideck/components'
import { useState } from 'react'
// import { sendSpringMessage } from 'utils/sendSpringMessage'
import { chatMessages } from '@/components/ChatMessageWrapper'
import { Input } from "@/components/ui/input";

const ChatForm = () => {
  const [content, setContent] = useState('')
  const { addChatMessage } = chatMessages()

  const handleSubmit = async (formData: FormData, e?: any) => {
    e?.preventDefault()

    const roleValueBasic = document.getElementById('role-display-text-basic').innerHTML;

    console.log('role-field-basic: ' + roleValueBasic)

    // const model = formData.get('model') as string;
    // const temperature = formData.get('temperature') as string;
    const mapOfFormDataBasic = {
      content: content,
      role: roleValueBasic,
      model: 'gpt-4.1',
      temperature: '1'
    }

    console.log(JSON.stringify(mapOfFormDataBasic))

    addChatMessage(mapOfFormDataBasic)
    setContent('')

  }

  const updateHiddenInputBasic = (id: string, value: string) => {
    const myDiv = document.getElementById(id + '-display-text-basic');
    myDiv.innerHTML = value;
    // alert('id: ' + id + ', value: ' + value)
    document.activeElement.blur();
  }

  return (
    <>

      <div className='chat-text-area-wrapper'>
        <form id='basic-chat-form' action={handleSubmit}>

          <div>
            <div className="flex items-center justify-between">
              <div className="text-zinc-300 text-sm">Chat Details</div>
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



              <div className='flex items-end'>
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

export default ChatForm
