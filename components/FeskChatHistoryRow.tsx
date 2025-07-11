'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react'
import { SVG_ICON_LOAD, SVG_ICON_EDIT, SVG_ICON_SEND, DEVELOPER_PROMPT, SVG_ICON_REPLY } from '@/config/FeskConstants'
import { ChatMessage, chatMessages } from '@/components/ChatMessageWrapper'
import FeskCitation from '@/components/FeskCitation'
import FeskMcpToolsList from '@/components/FeskMcpToolsList'
import Image from 'next/image';
import FeskCitationImage from '@/components/FeskCitationImage'
import FeskImageBase64 from '@/components/FeskImageBase64'


export default function FeskChatHistoryRow({ color, message, icon, index }: { color: string, message: ChatMessage, icon: ReactNode, index: number }) {
  const { messages, isLoadingAnswer, setActiveResponseId, getChatHistory, llmResponseList } = chatMessages()

  useEffect(() => {
    // Code to run when the component mounts on the client
    // console.log('MyComponent loaded!');
    // const checkbox = document.getElementById('collapseCheckbox-1');

    const elements = document.querySelectorAll('.fesk-checkbox');
    elements.forEach(element => {
      // console.log(element.textContent);
      element.checked = true;
    });


  }, []); // Empty dependency array ensures it runs only once on mount

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

  const handleSources = async (id: string) => {
    console.log('id: ' + id);
    const foundItem = llmResponseList.find(item => item.id === id);
    const sourcesArray = JSON.stringify(foundItem.output[1].content[0].annotations, null, 2);
    const myDiv = document.getElementById('sources')
    myDiv.innerHTML = sourcesArray;
    document.getElementById('modal_sources').showModal()
  }

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
                  <input id={'collapseCheckbox-' + index} className='fesk-checkbox' type="checkbox" />
                  <div className='collapse-title'>
                    {message.timestamp} &gt; assistant reply:
                  </div>
                  <div className="collapse-content">

                    <div className='dangerouslySetInnerHTML pr-[4px]'>
                      <div dangerouslySetInnerHTML={{ __html: message.htmlContent }} className='grow ml-4 text-blue-300'></div>
                    </div>

                    {message.imageGeneration && (
                      <>
                        <FeskImageBase64 id={`${message.responseMessageId}`} />

                      </>
                    )}

                    {message.websearchEnabled && (
                      <>
                        <div className='fesk-sources' >
                          <div className='flex flex-row'>
                            sources:
                          </div>
                          <div className='flex flex-row ml-[15px] mt-[5px]'>

                            <FeskCitation id={`${message.responseMessageId}`} />

                          </div>

                        </div>

                      </>
                    )}

                    {message.vectorStoreId && (
                      <>
                        <div className='fesk-sources' >
                          <div className='flex flex-row'>
                            sources:
                          </div>
                          <div className='flex flex-row ml-[15px] mt-[5px]'>

                            <FeskCitation id={`${message.responseMessageId}`} />

                          </div>

                        </div>

                      </>
                    )}

                    {message.mcpServerUrl && (
                      <>
                        <div className='fesk-sources' >
                          <div className='flex flex-row'>
                            MCP tools:
                          </div>
                          <div className='flex flex-row ml-[15px] mt-[5px]'>

                            <FeskMcpToolsList id={`${message.responseMessageId}`} />

                          </div>

                        </div>

                      </>
                    )}

                    {message.imageGeneration && (
                      <>
                        <div className='fesk-sources' >
                          <div className='flex flex-row'>
                            Revised prompt:
                          </div>
                          <div className='flex flex-row ml-[15px] mt-[5px]'>

                            <FeskCitationImage id={`${message.responseMessageId}`} />

                          </div>

                        </div>

                      </>
                    )}

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

                    {message.websearchEnabled && (
                      <li><a onClick={() => handleSources(message.responseMessageId)}>view sources</a></li>
                    )}

                    {message.vectorStoreId && (
                      <li><a onClick={() => handleSources(message.responseMessageId)}>view citations</a></li>
                    )}

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
                  <input id={'collapseCheckbox-' + index} className='fesk-checkbox' type="checkbox" />
                  <div className='collapse-title'>
                    {message.timestamp} &lt; developer message:
                  </div>
                  <div className="collapse-content">

                    {message.content}
                    <br />&nbsp;

                  </div>
                </div>
              </div>
            </div>
            <div className='flex-none min-width-[20px] max-width-[20px] content-start mr-[10px]'>
              <div className='grid grid-cols-1'>

                <div role="button" className="btn-invisible btn btn-xs btn-disabled bg-zinc-900 text-zinc-200 mt-[5px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="" /></svg>
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
                  <input id={'collapseCheckbox-' + index} className='fesk-checkbox' type="checkbox" />
                  <div className='collapse-title'>
                    {message.timestamp} &lt; user message:
                  </div>
                  <div className="collapse-content">

                    {message.content}
                    <br />&nbsp;

                  </div>
                </div>
              </div>
            </div>
            <div className='flex-none min-width-[20px] max-width-[20px] content-start mr-[10px]'>
              <div className='grid grid-cols-1'>

                {message.websearchEnabled && (
                  <div role="button" className="btn-invisible btn btn-xs btn-disabled bg-zinc-900 text-zinc-200 mt-[5px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 717 707"><path fill="#ffdf20" d="M0 342v-1C9 225 51 138 124 83C196 27 274 0 359 0c89-1 172 29 246 89c75 59 112 147 112 261v7c0 115-37 201-112 260c-75 60-158 90-247 90h-4c-87-1-167-31-241-91C39 557 1 466 0 342zm337-157V27h-24c-5 6-9 13-13 19s-8 12-12 19c-4 6-9 14-12 20c-4 6-7 12-10 19c-6 10-11 20-15 29c-5 9-9 18-12 26c6 4 13 9 21 12c9 3 18 6 27 8c10 2 19 3 27 4c9 1 17 2 23 2zm42-158v157c5 0 11 1 17 0c6 0 13-1 19-2c11-2 24-5 34-8c11-4 21-9 28-15c-12-29-25-52-38-74s-28-41-44-57v-1h-16zm-108 9v-1c-7 3-14 8-22 11c-7 3-16 7-23 11c-14 7-28 15-42 24c-13 9-26 19-37 29c4 4 9 8 13 11s9 7 14 11c4 2 9 5 14 9c5 3 11 7 17 11c8-18 16-37 26-54c10-18 21-35 32-50c1-2 2-4 4-6c1-1 2-4 4-6zm306 74v-1c-25-19-47-35-69-45s-44-20-64-28c16 16 30 36 39 55c10 20 20 41 28 61c4-2 9-4 15-8c5-3 12-6 18-9c6-4 11-8 17-12c6-5 12-9 16-13zm-17 223h115c0-37-8-72-23-108c-14-35-34-64-59-89v-1c-5 8-12 15-19 20c-8 5-15 9-23 13c-5 3-10 7-15 9c-5 3-12 5-17 8c4 8 8 17 12 25c3 9 8 19 10 28c6 16 10 33 14 50c3 15 5 31 5 45zM198 185v-1c-8-4-17-7-24-11c-7-5-14-10-20-14c-6-3-12-7-17-11s-9-8-13-12c-26 25-45 53-57 86c-13 33-22 70-26 110h123c0-28 4-55 11-82c6-28 15-49 23-65zm139 147V217c-8 1-18 1-27 0c-10-1-20-4-29-7c-8-2-18-4-26-7c-9-2-18-6-25-10c-6 10-11 22-15 35c-5 12-8 25-11 37c-2 12-3 25-4 36s-2 22-2 31h139zm42-113v113h148c0-6 0-13-1-21c-2-7-3-16-4-24c-3-12-6-25-10-37c-4-11-8-22-13-31c-2-5-4-11-6-15c-3-5-6-8-8-11c-11 8-26 13-44 17c-17 4-37 8-55 9h-7zM164 365H41c0 17 3 36 8 59c5 24 15 46 26 70c5 12 11 24 17 36c7 11 15 23 23 34c6-4 12-7 17-10c6-3 13-7 19-10c7-3 14-6 22-10c7-3 16-7 25-11c-8-25-17-49-23-76c-7-26-11-52-11-81v-1zm173 117V365H198c0 8 1 20 3 32c1 12 4 25 6 38c4 14 7 28 11 40s8 22 12 31c18-7 36-12 48-15c13-4 25-7 37-8h11c4-1 8-1 11-1zm42-117v116c7 1 15 2 23 3c9 1 20 3 29 5l15 3c5 2 11 3 16 4c6 2 12 3 18 5c5 2 10 3 14 5c13-33 21-60 26-83c5-22 7-41 7-57v-1H379zm296 1v-1H560v6c-1 19-4 41-8 64c-4 22-13 48-25 80c16 8 31 16 43 24s23 17 31 25c17-17 32-40 45-70c13-29 22-59 27-91c1-6 1-12 2-18v-19zM337 670V514c-25 4-46 9-62 13s-28 8-36 12c6 15 12 28 18 40c6 11 13 23 19 33c2 4 6 8 9 13c3 4 5 9 8 13c3 5 6 11 9 17c4 5 7 11 11 15h24zm42 0h23c9-7 18-17 25-28c8-11 17-24 23-35c7-13 14-25 20-37s11-23 15-31c-11-4-26-8-41-12s-36-8-65-12v155zm198-82v-1c-2-3-6-7-9-10s-8-7-13-10c-4-3-9-6-15-9s-14-7-21-11c-4 8-11 22-21 41c-9 19-25 42-45 67c25-4 47-13 67-25c22-11 41-26 57-42zm-372-32v-1c-7 4-18 9-29 14c-12 5-25 11-37 19c7 6 14 12 20 16c6 5 13 9 19 13c11 7 24 14 37 20s29 12 49 18c-7-8-12-18-17-26s-11-16-16-24s-9-17-13-25c-5-8-9-16-13-24z" /></svg>
                  </div>
                )
                }

                {message.vectorStoreId && (
                  <div role="button" className="btn-invisible btn btn-xs btn-disabled bg-zinc-900 text-zinc-200 mt-[5px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffdf20" d="M6 3v26h20V9.594l-.281-.313l-6-6L19.406 3zm2 2h10v6h6v16H8zm12 1.438L22.563 9H20z" /></svg>
                  </div>
                )
                }

                {message.mcpServerLabel && (
                  <div role="button" className="btn-invisible btn btn-xs btn-disabled bg-zinc-900 text-zinc-200 mt-[5px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffdf20" d="M16 2a8 8 0 1 0 8 8a8.01 8.01 0 0 0-8-8zm5.91 7h-2.438a15.246 15.246 0 0 0-.791-4.36A6.009 6.009 0 0 1 21.91 9zm-5.888 6.999h-.008c-.38-.12-1.309-1.821-1.479-4.999h2.93c-.17 3.176-1.094 4.877-1.443 4.999zM14.535 9c.17-3.176 1.094-4.877 1.443-4.999h.008c.38.12 1.309 1.821 1.479 4.999zM13.32 4.64A15.246 15.246 0 0 0 12.528 9H10.09a6.009 6.009 0 0 1 3.23-4.36zM10.09 11h2.437a15.246 15.246 0 0 0 .792 4.36A6.009 6.009 0 0 1 10.09 11zm8.59 4.36a15.246 15.246 0 0 0 .792-4.36h2.438a6.009 6.009 0 0 1-3.23 4.36zM28 30H4a2.002 2.002 0 0 1-2-2v-6a2.002 2.002 0 0 1 2-2h24a2.002 2.002 0 0 1 2 2v6a2.002 2.002 0 0 1-2 2zM4 22v6h24v-6z" /><circle cx="7" cy="25" r="1" fill="currentColor" /></svg>
                  </div>
                )
                }


              </div>
            </div>
          </div>

        </>
      )}



    </>
  );

}