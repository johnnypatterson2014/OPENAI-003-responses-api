'use client';

import { Button, TextArea } from '@apideck/components'
import { useState } from 'react'
import { chatMessages } from '@/components/ChatMessageWrapper'
import useToolsStore from "@/stores/useToolsStore";
import FeskButtonSecondary from '@/components/FeskButtonSecondary';
import FeskLoading from '@/components/FeskLoading'
import { SVG_ICON_LOAD } from '@/config/FeskConstants'
import { Input } from "@/components/ui/input";
import FeskFieldset from '@/components/FeskFieldset';

const ChatHistoryPersistence = () => {
  const { isLoadingAnswer, getChatHistoryPersistence, chatHistoryPersistenceData, saveCurrentChatHistory, loadChatSession, deleteChatSession } = chatMessages()



  const isExistingChatMessages = (chatHistoryPersistenceData != null && chatHistoryPersistenceData.length > 0);


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
  }

  //
  const deleteChatSessionAction = async (id: number, e?: any) => {
    e?.preventDefault();
    // alert(id)
    await deleteChatSession(id);
    await getChatHistory();
    // alert('Successfully loaded chat session.');
  }

  const saveButtonJsx = <FeskButtonSecondary icon={SVG_ICON_LOAD}><a onClick={saveChatHistory}>Save current session</a></FeskButtonSecondary>
  const loadButtonJsx = <FeskButtonSecondary icon={SVG_ICON_LOAD}><a onClick={getChatHistory}>Get saved sessions</a></FeskButtonSecondary>

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

            <FeskFieldset label='&nbsp;' buttons='&nbsp;' align='items-center'>
              <FeskButtonSecondary icon={SVG_ICON_LOAD}><a onClick={getChatHistory}>Get saved sessions</a></FeskButtonSecondary>
            </FeskFieldset>



            <FeskFieldset label='saved sessions' buttons='&nbsp;' align='items-start'>

              {isLoadingAnswer && (
                <FeskLoading />

              )
              }

              {
                !isExistingChatMessages && (
                  <div>(no sessions)</div>
                )
              }

              {isExistingChatMessages && chatHistoryPersistenceData.map((item, i) => (

                <div key={`chatHistoryMessage-${i}`} className='flex items-center'>
                  <div className='flex-1 mb-[10px]'>
                    <Input

                      type="text"
                      className="bg-zinc-900 border border-zinc-600 text-sm flex-1 text-zinc-300"
                      value={item.name}
                      readOnly
                    />
                  </div>
                  <div className='flex-none ml-[10px] mb-[10px]'>

                    <FeskButtonSecondary icon={SVG_ICON_LOAD}>
                      <a href='#' onClick={() => loadChatSessionAction(item.id)}>load session</a>
                    </FeskButtonSecondary>

                  </div>

                  <div className='flex-none ml-[10px] mb-[10px]'>

                    <FeskButtonSecondary icon={SVG_ICON_LOAD}>
                      <a href='#' onClick={() => deleteChatSessionAction(item.id)}>delete</a>
                    </FeskButtonSecondary>

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