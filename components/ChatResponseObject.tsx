'use client';

import { chatMessages } from '@/components/ChatMessageWrapper'

const ChatResponseObject = () => {
  const { activeId, llmResponseList, isLoadingAnswer } = chatMessages()

  const isActiveIdProvided = activeId !== ''
  let foundItem = null;
  let displayText = null;

  if (isActiveIdProvided) {
    foundItem = llmResponseList.find(item => item.id === activeId);
    displayText = JSON.stringify(foundItem, null, 2);
  }

  return (
    <>
      <label className='fesk-card-h2'>Chat response object</label>

      {isLoadingAnswer && (
        <div className=''>
          <div className="" >
            <div className=''>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6e9fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>
            </div>

            <div className="loader-line-1">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

          </div>
        </div>
      )}

      {isActiveIdProvided && !isLoadingAnswer && (
        <span>
          <pre className='text-xs'>{displayText}</pre>
        </span>
      )}


    </>
  )
}

export default ChatResponseObject
