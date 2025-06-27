'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";
import { chatMessages } from '@/components/ChatMessageWrapper'
import FeskButton3 from '@/components/FeskButton3'

export default function FeskMcpToolsList({ id }: { id: string }) {
  const { llmResponseList } = chatMessages()

  // console.log('id: ' + id);
  // console.log(JSON.stringify(llmResponseList));

  const foundItem = llmResponseList.find(item => item.id === id);
  // console.log(JSON.stringify(foundItem));

  const toolsArray = foundItem.output[0].tools;
  // console.log(JSON.stringify(sourcesArray));

  return (
    <>
      <div className='grid grid-cols-1'>
        {toolsArray?.map((tool, i) => {

          return (

            <div className='m-[2px]' key={`citation-${i}`}>

              <FeskButton3>
                <div>{tool.name} - {tool.description}</div>
              </FeskButton3>

            </div>

          )


        }
        )
        }
      </div>
    </>
  );

}