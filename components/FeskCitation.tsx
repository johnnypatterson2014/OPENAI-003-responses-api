'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";
import { chatMessages } from '@/components/ChatMessageWrapper'
import FeskButton3 from '@/components/FeskButton3'

export default function FeskCitation({ id }: { id: string }) {
  const { llmResponseList } = chatMessages()

  // console.log('id: ' + id);
  // console.log(JSON.stringify(llmResponseList));

  const foundItem = llmResponseList.find(item => item.id === id);
  // console.log(JSON.stringify(foundItem));

  const sourcesArray = foundItem.output[1].content[0].annotations;
  // console.log(JSON.stringify(sourcesArray));

  return (
    <>
      <div className='grid grid-cols-1'>
        {sourcesArray?.map((source, i) => {

          const isUrlSource = source.type === 'url_citation'
          const isFileSource = source.type === 'file_citation'

          return (

            <div className='m-[2px]' key={`citation-${i}`}>

              {isUrlSource && (
                <FeskButton3>
                  <a href={`${source.url}`} target='_blank'>{source.title}</a> - start index: {source.start_index}, end index: {source.end_index}
                </FeskButton3>

              )}

              {isFileSource && (
                <FeskButton3>
                  {source.filename} - index: {source.index}
                </FeskButton3>


              )}


            </div>

          )


        }
        )
        }
      </div>
    </>
  );

}