'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";
import { chatMessages } from '@/components/ChatMessageWrapper'
import FeskButton3 from '@/components/FeskButton3'

export default function FeskImageBase64({ id }: { id: string }) {
  const { llmResponseList } = chatMessages()
  const foundItem = llmResponseList.find(item => item.id === id);
  // console.log(JSON.stringify(foundItem));

  const imageBase64 = foundItem.output[0].result;

  return (
    <>
      <div style={{ position: 'relative' }}>
        <img
          src={`data:image/png;base64,${imageBase64}`}
          alt="generated image"
          width={500}
        ></img>
      </div>


    </>
  );

}