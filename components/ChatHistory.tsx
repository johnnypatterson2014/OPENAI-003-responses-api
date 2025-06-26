'use client';

import { chatMessages } from '@/components/ChatMessageWrapper'
import ChatResponseObject from '@/components/ChatResponseObject'
import ChatRequestResponseObject from '@/components/ChatRequestResponseObject'
import FeskLoading from '@/components/FeskLoading'
import FeskChatHistoryRow from '@/components/FeskChatHistoryRow'
import { SVG_ICON_LOAD, SVG_ICON_EDIT, SVG_ICON_SEND, DEVELOPER_PROMPT, SVG_ICON_REPLY, SVG_ICON_REQ_DEV, SVG_ICON_REQ_USER } from '@/config/FeskConstants'
import { Children, useState } from 'react'
import { remark } from 'remark';
import html from 'remark-html';

const ChatHistory = () => {
  const { messages, isLoadingAnswer, setActiveResponseId, getChatHistory, llmResponseList } = chatMessages()
  const [markdownHtml] = useState('')

  const handleSources = async (id: string) => {
    console.log('id: ' + id);
    const foundItem = llmResponseList.find(item => item.id === id);
    const sourcesArray = JSON.stringify(foundItem.output[1].content[0].annotations, null, 2);
    const myDiv = document.getElementById('sources')
    myDiv.innerHTML = sourcesArray;
    document.getElementById('modal_sources').showModal()
  }

  const isExistingChatMessages = (messages != null && messages.length > 0);

  return (
    <>

      <div className='fesk-h2'>chat history</div>
      {
        !isExistingChatMessages && (
          <div
            className='p-[5px]'
            style={{ color: "#999999" }}
          >(no chat messages)
          </div>
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


      <dialog id="modal_json_response" className="modal">

        <div className="modal-box w-11/12 max-w-5xl h-11/12">

          <div className='pre-scrollable overflow-auto'>
            <ChatResponseObject />

          </div>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="modal_json_request" className="modal">

        <div className="modal-box w-11/12 max-w-5xl h-11/12">

          <div className='pre-scrollable overflow-auto'>
            <ChatRequestResponseObject />

          </div>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>



      <dialog id="modal_sources" className="modal">

        <div className="modal-box w-11/12 max-w-5xl h-11/12">

          <div className='pre-scrollable overflow-auto'>

            <span>
              <pre id='sources' className='text-xs'></pre>
            </span>

          </div>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {
        isLoadingAnswer && (
          <FeskLoading />
        )
      }

    </>
  )
}

export default ChatHistory
