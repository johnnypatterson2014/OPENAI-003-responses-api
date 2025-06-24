'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";

export default function FeskFieldsetInput({ label, id, initialValue, children }: { label: string, id: string, initialValue: string, children: ReactNode }) {

  return (
    <>
      <div className="flex items-center flex-row mb-[10px]">


        <div className='flex flex-1 justify-end'>

          <div className='mr-[10px]'>
            <label className="text-sm w-24 mt-[8px]">
              {label}
            </label>
          </div>

        </div>

        <div className="flex-2">

          <Input
            id={`${id}`}
            name={`${id}`}
            type="text"
            className="bg-zinc-900 border border-zinc-600 text-sm flex-1 text-zinc-300"
            value={`${initialValue}`}
            readOnly
          />
        </div>

        <div className='flex-1 ml-[10px]'>
          {children}
        </div>

      </div>

    </>
  );

}