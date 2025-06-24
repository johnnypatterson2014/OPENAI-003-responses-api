'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";

export default function FeskFieldsetSubmit({ label, children }: { label: string, children: ReactNode }) {

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
          &nbsp;
        </div>

        <div className='flex-1 ml-[10px]'>

          {children}
        </div>

      </div>

    </>
  );

}