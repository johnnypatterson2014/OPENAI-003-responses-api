'use client';

import { chatMessages } from '@/components/ChatMessageWrapper'
import ChatResponseObject from '@/components/ChatResponseObject'
import ChatRequestResponseObject from '@/components/ChatRequestResponseObject'
import FeskLoading from '@/components/FeskLoading'
import FeskModal from '@/components/FeskModal'
import FeskButton3 from '@/components/FeskButton3'
import FeskChatHistoryRow from '@/components/FeskChatHistoryRow'
import { SVG_ICON_REPLY, SVG_ICON_REQ_DEV, SVG_ICON_REQ_USER } from '@/config/FeskConstants'
import { useState } from 'react'


const ChatHistory = () => {
  const { messages, isLoadingAnswer } = chatMessages()

  const isExistingChatMessages = (messages != null && messages.length > 0);

  const toggleAll = (value: boolean) => {
    const elements = document.querySelectorAll('.fesk-checkbox');
    elements.forEach(element => {
      // console.log(element.textContent);
      element.checked = value;
    });
  }

  return (
    <>

      <div className='flex'>
        <div className='flex-none fesk-h2'>chat history</div>
        <div className='flex-1 justify-items-end'>
          <div className='grid grid-cols-2'>
            <div>
              <FeskButton3>
                <a onClick={() => toggleAll(false)}>collapse all</a>
              </FeskButton3>
            </div>

            <div className='ml-[5px]'>
              <FeskButton3>
                <a onClick={() => toggleAll(true)}>expand all</a>
              </FeskButton3>
            </div>
          </div>

        </div>
      </div>

      {
        !isExistingChatMessages && (
          <div className='p-[5px] fesk-muted'>(no chat messages)</div>
        )
      }

      {messages?.map((message, i) => {
        const isUser = message.role === 'user'
        const isDeveloper = message.role === 'developer'
        const isAssistant = message.role === 'assistant'

        const nextIndex = i + 1
        let nextMessageId = null;
        if (isUser && (nextIndex < messages.length)) {
          nextMessageId = messages[nextIndex].responseMessageId
        }

        return (

          <div id={`message-${i}`} className='my-card-chat' key={`message-${i}`}>

            {isAssistant && (
              <FeskChatHistoryRow color='text-blue-300' icon={SVG_ICON_REPLY} index={i} message={message} />
            )}

            {isDeveloper && (
              <FeskChatHistoryRow color='text-green-300' icon={SVG_ICON_REQ_DEV} index={i} message={message} />
            )}

            {isUser && (
              <FeskChatHistoryRow color='text-yellow-300' icon={SVG_ICON_REQ_USER} index={i} message={message} />
            )}

          </div>
        )
      }
      )
      }

      <FeskModal id="modal_json_response">
        <ChatResponseObject />
      </FeskModal>

      <FeskModal id="modal_json_request">
        <ChatRequestResponseObject />
      </FeskModal>

      <FeskModal id="modal_sources">
        <span>
          <pre id='sources' className='text-xs'></pre>
        </span>
      </FeskModal>


      {
        isLoadingAnswer && (
          <FeskLoading />
        )
      }

    </>
  )
}

export default ChatHistory
