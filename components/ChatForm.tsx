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
    const myDiv = document.getElementById(id);
    myDiv.value = value;
    // myDiv.innerHTML = value;
    // alert('id: ' + id + ', value: ' + value)
    document.activeElement.blur();
  }

  const loadTemplate = async (e?: any) => {
    e?.preventDefault()
    // setContent(prompt)
    // const el = document.querySelector('#promptTemplateDropdown');
    // el.style.display = 'none';
    document.activeElement.blur();
  }

  return (
    <>

      <div className='chat-text-area-wrapper'>
        <form id='basic-chat-form' action={handleSubmit}>

          <div>


            <div className="flex items-center flex-row mb-[10px]">
              <div className='flex-1'>&nbsp;</div>

              <div className='flex flex-2'>

                <div className="dropdown dropdown-right">
                  <div tabIndex={0} role="button" className="items-center btn btn-sm bg-zinc-800 hover:bg-zinc-100 border border-zinc-600 text-zinc-200 hover:text-zinc-900">

                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm9 4.094l-.719.687l-6 6l1.438 1.438L16 13.937l5.281 5.282l1.438-1.438l-6-6z" /></svg>
                    </div>
                    <div>
                      load template
                    </div>

                  </div>

                  <ul id="promptTemplateDropdown" tabIndex={0} className="dropdown-content menu bg-base-200 rounded-sm outline-[1px] outline-blue-200 z-1 w-50 p-[2px] mt-[2px] mb-[2px] ml-[5px] mr-[2px] shadow-sm">

                    <li className='m-[2px]'><a onClick={loadTemplate}>generic</a></li>
                    <li className='m-[2px]'><a>code generation</a></li>
                    <li className='m-[2px]'><a>agentic</a></li>

                  </ul>
                </div>


              </div>
              <div className='flex-1'>&nbsp;</div>
            </div>





            <div className="flex items-center flex-row mb-[10px]">


              <div className='flex flex-1 justify-end'>

                <div className='mr-[10px]'>
                  <label className="text-sm w-24 mt-[8px]">
                    Role
                  </label>
                </div>

              </div>

              <div className="flex-2">

                <Input
                  id="role"
                  name="role"
                  type="text"
                  className="bg-zinc-900 border border-zinc-600 text-sm flex-1 text-zinc-300"
                  value='user'
                  readOnly
                />
              </div>

              <div className='flex-1 ml-[10px]'>

                <div className="dropdown dropdown-bottom">
                  <div tabIndex={0} role="button" className="items-center btn btn-sm bg-zinc-800 hover:bg-zinc-100 border border-zinc-600 text-zinc-200 hover:text-zinc-900">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z" /><path fill="currentColor" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z" /></svg>
                    </div>
                    <div>
                      Edit
                    </div>
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-sm outline-[1px] outline-blue-200 z-1 w-40 p-[2px] mt-[5px] mb-[2px] ml-[2px] mr-[2px] shadow-sm">

                    <li className='m-[2px]'><a onClick={() => updateHiddenInputBasic('role', 'user')}>user</a></li>
                    <li className='m-[2px]'><a onClick={() => updateHiddenInputBasic('role', 'developer')}>developer</a></li>

                  </ul>
                </div>
              </div>

            </div>

            <div className="flex items-center flex-row mb-[10px]">


              <div className='flex flex-1 justify-end'>

                <div className='mr-[10px]'>
                  <label className="text-sm w-24 mt-[8px]">
                    Model
                  </label>
                </div>

              </div>

              <div className="flex-2">

                <Input
                  id="model"
                  name="model"
                  type="text"
                  className="bg-zinc-900 border border-zinc-600 text-sm flex-1 text-zinc-300"
                  value='gpt-4.1'
                  readOnly
                />
              </div>

              <div className='flex-1 ml-[10px]'>

              </div>

            </div>

            <div className="flex items-center flex-row mb-[10px]">


              <div className='flex flex-1 justify-end'>

                <div className='mr-[10px]'>
                  <label className="text-sm w-24 mt-[8px]">
                    Temperature
                  </label>
                </div>

              </div>

              <div className="flex-2">

                <Input
                  id="temperature"
                  name="temperature"
                  type="text"
                  className="bg-zinc-900 border border-zinc-600 text-sm flex-1 text-zinc-300"
                  value='1'
                  readOnly
                />
              </div>

              <div className='flex-1 ml-[10px]'>

              </div>

            </div>


            <div className="flex items-start flex-row mb-[10px]">


              <div className='flex flex-1 justify-end'>

                <div className='mr-[10px]'>
                  <label className="text-sm w-24 mt-[8px]">
                    Content
                  </label>
                </div>

              </div>

              <div className="flex-2">

                <TextArea
                  id="my-text-area"
                  name="content"
                  placeholder="Enter your message here..."
                  rows={10}
                  value={content}
                  autoFocus
                  className="bg-zinc-900 border border-zinc-600 text-zinc-300 focus:outline-none focus:ring-1"
                  onChange={(e: any) => setContent(e.target.value)}
                />
              </div>

              <div className='flex-1 ml-[10px]'>

              </div>

            </div>




            <div className="flex items-center flex-row mb-[10px]">
              <div className='flex-1'>&nbsp;</div>

              <div className='flex flex-2 ml-[10px]'>

                <div className='mt-[4px]'>
                  <input type="checkbox" id="websearch-enabled" name="websearch-enabled" value='false' className="" />
                </div>
                <div className='mt-[1px] ml-[10px]'>enable web search</div>


              </div>
              <div className='flex-1'>&nbsp;</div>
            </div>





            <div className="flex items-start flex-row mb-[10px]">
              <div className='flex-1'>&nbsp;</div>

              <div className='flex flex-2 justify-end mr-[10px]'>

                <div role="button" className="items-center btn btn-sm btn-primary hover:bg-zinc-100 hover:text-zinc-900">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>
                  </div>
                  <div>
                    Send
                  </div>
                </div>

              </div>
              <div className='flex-1'>&nbsp;</div>
            </div>

          </div>


        </form>
      </div>
    </>
  )
}

export default ChatForm
