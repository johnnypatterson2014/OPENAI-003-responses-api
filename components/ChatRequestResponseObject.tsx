'use client';

import { chatMessages } from '@/components/ChatMessageWrapper'

const ChatRequestResponseObject = () => {
  const { activeRequestResponseId, llmRequestResponseList, isLoadingAnswer } = chatMessages()

  const isActiveIdProvided = activeRequestResponseId !== ''
  let foundItem = null;
  let displayText = null;

  if (isActiveIdProvided) {
    foundItem = llmRequestResponseList.find(item => item.id === activeRequestResponseId);
    displayText = JSON.stringify(foundItem.content, null, 2);
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

      {!isLoadingAnswer && (
        <span>
          <pre className='text-xs'>{displayText}</pre>
        </span>
      )}


    </>
  )
}

export default ChatRequestResponseObject
