'use client';

import { Button, TextArea } from '@apideck/components'
import { useState } from 'react'
import { chatMessages } from '@/components/ChatMessageWrapper'
import useToolsStore from "@/stores/useToolsStore";
import FeskButtonSecondary from '@/components/FeskButtonSecondary';
import FeskButton3 from '@/components/FeskButton3';
import FeskLoading from '@/components/FeskLoading'
import { SVG_ICON_LOAD } from '@/config/FeskConstants'
import { Input } from "@/components/ui/input";
import FeskFieldset from '@/components/FeskFieldset';
import FeskFieldsetJustifyEnd from '@/components/FeskFieldsetJustifyEnd';

const ChatHistoryPersistence = () => {
  const { isLoadingAnswer, getChatHistoryPersistence, chatHistoryPersistenceData, saveCurrentChatHistory, loadChatSession, deleteChatSession } = chatMessages()



  const isExistingChatMessages = (chatHistoryPersistenceData != null && chatHistoryPersistenceData.length > 0);

  const resetCheckboxes = () => {
    const elements = document.querySelectorAll('.fesk-checkbox');
    elements.forEach(element => {
      // console.log(element.textContent);
      element.checked = true;
    });
  }


  // const { addChatMessage } = chatMessages()
  const getChatHistory = async (e?: any) => {
    e?.preventDefault();
    getChatHistoryPersistence();
    // console.log('testing');
    // alert('testing');
  }

  const saveChatHistory = async (e?: any) => {
    e?.preventDefault();
    // alert('testing')
    const sessionName = document.getElementById('chat_session_name')?.value;
    if (sessionName) {
      await saveCurrentChatHistory(sessionName);
      await getChatHistory();
    }
    // alert('Successfully saved chat history.');
  }

  const loadChatSessionAction = async (id: number, e?: any) => {
    e?.preventDefault();
    // alert(id)
    loadChatSession(id);
    // alert('Successfully loaded chat session.');
    resetCheckboxes();
  }

  //
  const deleteChatSessionAction = async (id: number, e?: any) => {
    e?.preventDefault();
    // alert(id)
    await deleteChatSession(id);
    await getChatHistory();
    // alert('Successfully loaded chat session.');
  }

  const saveButtonJsx = <FeskButtonSecondary><a onClick={saveChatHistory}>Save current session</a></FeskButtonSecondary>

  return (
    <>
      <div className='chat-text-area-wrapper'>
        <form id='chat-form-session'>

          <div>

            <FeskFieldset label='session name' buttons={saveButtonJsx} align='items-center'>
              <Input
                id="chat_session_name"
                name="chat_session_name"
                type="text"
                className="bg-zinc-900 border border-zinc-600 text-sm flex-1 text-zinc-300"
                placeholder='Name for chat session'
              />
            </FeskFieldset>

            <FeskFieldset label='&nbsp;' buttons='&nbsp;' align='items-center'>
              <p>&nbsp;</p>
            </FeskFieldset>


            <FeskFieldsetJustifyEnd label='&nbsp;' buttons='&nbsp;' align='justify-end'>
              <div>
                <FeskButtonSecondary>
                  <a onClick={getChatHistory}>Get saved sessions</a>
                </FeskButtonSecondary>
              </div>
            </FeskFieldsetJustifyEnd>


            <FeskFieldset label='saved sessions' buttons='&nbsp;' align='items-start'>

              {isLoadingAnswer && (
                <FeskLoading />

              )
              }

              {
                !isExistingChatMessages && (
                  <div className='flex justify-end'>
                    <div className='flex-none fesk-muted'>(no sessions)</div>
                  </div>
                )
              }

              {isExistingChatMessages && chatHistoryPersistenceData.map((item, i) => (

                <div key={`chatHistoryMessage-${i}`} className='flex items-center'>
                  <div className='flex-1 mb-[10px] fesk-item justify-items-end'>
                    <div>{item.name}</div>
                  </div>
                  <div className='flex-none ml-[10px] mb-[10px]'>

                    <a href='#' onClick={() => deleteChatSessionAction(item.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x cursor-pointer text-zinc-400 mb-0.5 shrink-0 mt-0.5 hover:text-zinc-700 transition-all" data-state="closed"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
                    </a>



                  </div>

                  <div className='flex-none ml-[10px] mb-[10px]'>


                    <FeskButton3>
                      <a href='#' onClick={() => loadChatSessionAction(item.id)}>restore</a>
                    </FeskButton3>


                  </div>
                </div>

              ))

              }

            </FeskFieldset>


          </div>


        </form>
      </div >
    </>
  )
}

export default ChatHistoryPersistence