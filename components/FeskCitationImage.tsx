'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";
import { chatMessages } from '@/components/ChatMessageWrapper'
import FeskButton3 from '@/components/FeskButton3'

export default function FeskCitationImage({ id }: { id: string }) {
  const { llmResponseList } = chatMessages()

  // console.log('id: ' + id);
  // console.log(JSON.stringify(llmResponseList));

  const foundItem = llmResponseList.find(item => item.id === id);
  // console.log(JSON.stringify(foundItem));

  const revisedPrompt = foundItem.output[0].revised_prompt;
  // console.log(JSON.stringify(sourcesArray));

  return (
    <>
      <div className='grid grid-cols-1 fesk-item'>
        {revisedPrompt}
      </div>
    </>
  );

}