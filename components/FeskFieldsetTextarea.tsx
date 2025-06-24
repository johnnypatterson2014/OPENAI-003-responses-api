'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";
import { useState } from 'react'
import { TextArea } from '@apideck/components'

export default function FeskFieldsetTextarea({ label, id, initialValue, rowsNum, children }: { label: string, id: string, initialValue: string, rowsNum: string, children: ReactNode }) {
  const [content, setContent] = useState('')

  return (
    <>
      <div className="flex items-start flex-row mb-[10px]">


        <div className='flex flex-1 justify-end'>

          <div className='mr-[10px]'>
            <label className="text-sm w-24 mt-[8px]">
              {label}
            </label>
          </div>

        </div>

        <div className="flex-2">

          <TextArea
            id={`${id}`}
            name={`${id}`}
            placeholder={`${initialValue}`}
            rows={rowsNum}
            autoFocus
            className="bg-zinc-900 border border-zinc-600 text-zinc-300 focus:outline-none focus:ring-1"
          />

        </div>

        <div className='flex-1 ml-[10px]'>
          {children}
        </div>

      </div>

    </>
  );

}