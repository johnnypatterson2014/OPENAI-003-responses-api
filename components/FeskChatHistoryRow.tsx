'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react'
import FeskButtonDropdown from '@/components/FeskButtonDropdown';
import { SVG_ICON_LOAD, SVG_ICON_EDIT, SVG_ICON_SEND, DEVELOPER_PROMPT, SVG_ICON_REPLY } from '@/config/FeskConstants'
import { ChatMessage } from '@/components/ChatMessageWrapper'
import { chatMessages } from '@/components/ChatMessageWrapper'

export default function FeskChatHistoryRow({ color, message, icon, index }: { color: string, message: ChatMessage, icon: ReactNode, index: number }) {
  const { messages, isLoadingAnswer, setActiveResponseId, getChatHistory, llmResponseList } = chatMessages()

  useEffect(() => {
    // Code to run when the component mounts on the client
    // console.log('MyComponent loaded!');
    const checkbox = document.getElementById('collapseCheckbox-1');
    checkbox.checked = true;
  }, []); // Empty dependency array ensures it runs only once on mount

  const toggleCollapse = async (e?: any) => {
    e?.preventDefault()
    const checkbox = document.getElementById('collapseCheckbox-1');
    checkbox.checked = !checkbox.checked;
  }

  const handleActiveId = async (id: string, e?: any) => {
    e?.preventDefault()
    setActiveResponseId(id)
    document.getElementById('modal_json_response').showModal()
  }

  const handleUserRequestId = async (id: string, e?: any) => {
    e?.preventDefault()
    getChatHistory(id)
    document.getElementById('modal_json_request').showModal()
  }

  // function toggleCollapse() {
  //   const checkbox = document.getElementById('collapseCheckbox');
  //   checkbox.checked = !checkbox.checked;
  // }

  // let isUser = message.role === 'user'



  return (
    <>


      {message.role === 'assistant' && (
        <>
          <div className='flex flex-row items-start' >
            <div className='flex-none ml-[15px] mt-[5px] min-width-[20px] max-width-[20px]'>
              {icon}
            </div>

            <div className='grow'>
              <div className={`${color}` + ' ml-[15px] mr-[15px] mt-[3px]'}>

                <div className='collapse'>
                  <input id={'collapseCheckbox-' + index} type="checkbox" />
                  <div className='collapse-title'>
                    message:
                  </div>
                  <div className="collapse-content">

                    <div className='dangerouslySetInnerHTML pr-[4px]'>
                      <div dangerouslySetInnerHTML={{ __html: message.htmlContent }} className='grow ml-4 text-blue-300'></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className='flex-none min-width-[20px] max-width-[20px] content-start mr-[10px]'>
              <div className='grid grid-cols-1'>

                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-xs bg-zinc-800 hover:bg-zinc-600 border border-zinc-600 text-zinc-200 hover:text-zinc-900 mt-[5px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffffff" d="M12 6a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z" /></svg>
                  </div>
                  <ul tabIndex={0} className="dropdown-content text-xs fesk-menu menu bg-zinc-800 z-1 w-50 mt-[5px] mb-[2px] ml-[2px] mr-[2px] shadow-sm">

                    <li className='fesk-menu-li'><a onClick={() => handleActiveId(message.responseMessageId)}>view json</a></li>
                    <li className='fesk-menu-li'><a onClick={() => handleUserRequestId(message.responseMessageId)}>view input request json</a></li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )
      }






      {message.role === 'developer' && (
        <>
          <div className='flex flex-row items-start' >
            <div className='flex-none ml-[15px] mt-[5px] min-width-[20px] max-width-[20px]'>
              {icon}
            </div>

            <div className='grow'>
              <div className={`${color}` + ' ml-[15px] mr-[15px] mt-[3px]'}>

                <div className='collapse'>
                  <input id={'collapseCheckbox-' + index} type="checkbox" />
                  <div className='collapse-title'>
                    message:
                  </div>
                  <div className="collapse-content">

                    {message.content}
                    <br />&nbsp;

                  </div>
                </div>
              </div>
            </div>
          </div>

        </>
      )}


      {message.role === 'user' && (
        <>
          <div className='flex flex-row items-start' >
            <div className='flex-none ml-[15px] mt-[5px] min-width-[20px] max-width-[20px]'>
              {icon}
            </div>

            <div className='grow'>
              <div className={`${color}` + ' ml-[15px] mr-[15px] mt-[3px]'}>

                <div className='collapse'>
                  <input id={'collapseCheckbox-' + index} type="checkbox" />
                  <div className='collapse-title'>
                    message:
                  </div>
                  <div className="collapse-content">

                    {message.content}
                    <br />&nbsp;

                  </div>
                </div>
              </div>
            </div>
          </div>

        </>
      )}





      {/* <div className="my-card-chat">

        <div className='flex flex-row items-start' >

          <div className='flex-none ml-[15px] mt-[5px] min-width-[20px] max-width-[20px]'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffdf20" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>
          </div>



          <div className='grow'>
            <div className='text-green-300 ml-[15px] mr-[15px] mt-[3px]'>

              <div className='collapse'>
                <input id='collapseCheckbox2' type="checkbox" />
                <div className='collapse-title'>
                  message:
                </div>
                <div className="collapse-content">

                  You are a helpful assistant helping users with their queries. If they need up to date information, you can use the web search tool to search the web for relevant information. Only use web search once at a time, if you've already used it and there is no new information, don't use it again. If they ask for something that is related to their own data, use the file search tool to search their files for relevant information. If they ask something that could be solved through code, use the code interpreter tool to solve it.

                </div>
              </div>
            </div>
          </div>




          <div className='flex-none min-width-[20px] max-width-[20px] content-start mr-[10px]'>
            <div className='grid grid-cols-1'>

              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-xs bg-zinc-800 hover:bg-zinc-600 border border-zinc-600 text-zinc-200 hover:text-zinc-900 mt-[5px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffffff" d="M12 6a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z" /></svg>
                </div>
                <ul tabIndex={0} className="dropdown-content text-xs fesk-menu menu bg-zinc-800 z-1 w-50 mt-[5px] mb-[2px] ml-[2px] mr-[2px] shadow-sm">

                  <li className='fesk-menu-li'><a onClick={() => handleActiveId(message.responseMessageId)}>view json</a></li>
                  <li className='fesk-menu-li'><a onClick={() => handleUserRequestId(message.responseMessageId)}>view input request json</a></li>

                </ul>
              </div>

            </div>

          </div>

        </div>

      </div> */}



    </>
  );

}