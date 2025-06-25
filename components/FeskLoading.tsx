'use client';

export default function FeskLoading() {

  return (
    <>
      <div className='flex my-card-chat'>
        <div className="flex chat-message" >
          <div className='flex-none'>
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

    </>
  );

}