'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";

export default function FeskFieldset2({ label, children }: { label: string, children: ReactNode }) {

  return (
    <>
      <div className={`flex flex-row mb-[10px] items-start`}>


        <div className='flex-1 justify-end'>

          <div className='mr-[10px]'>
            <label className="text-sm w-24 mt-[8px]">
              {label}
            </label>

            {children}

          </div>

        </div>

      </div>

    </>
  );

}