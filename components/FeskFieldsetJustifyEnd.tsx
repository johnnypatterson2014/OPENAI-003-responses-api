'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";

export default function FeskFieldsetJustifyEnd({ label, buttons, align, children }: { label: string, buttons: ReactNode, align: string, children: ReactNode }) {

  return (
    <>
      <div className={`flex flex-row mb-[10px] ${align}`}>


        <div className='flex flex-1 justify-end'>

          <div className='mr-[10px]'>
            <label className="text-sm w-24 mt-[8px]">
              {label}
            </label>
          </div>

        </div>

        <div className="flex-2 justify-items-end">

          {children}

        </div>

        <div className='flex-1 ml-[10px]'>
          {buttons}
        </div>

      </div>

    </>
  );

}