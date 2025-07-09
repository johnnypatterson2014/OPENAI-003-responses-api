'use client';

const JsonResponseObject = ({ title, id }: { title: string, id: string }) => {

  return (
    <>
      <label className='fesk-card-h2'>{title}</label>

      <span>
        <pre className='text-xs'>
          <div id={`${id}`}>

          </div>
        </pre>
      </span>

    </>
  )
}

export default JsonResponseObject
