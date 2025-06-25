'use client';

import { ReactNode } from 'react'

export default function FeskButtonPrimary({ label, icon }: { label: string, icon: ReactNode }) {

  return (
    <>
      {/* <div role="button" className="items-center btn btn-sm btn-primary hover:bg-zinc-100 hover:text-zinc-900">
        <div>
          {icon}
        </div>
        <div>
          {label}
        </div>
      </div> */}
      <button type='submit' className="btn btn-sm btn-primary">
        {label}
      </button>

    </>
  );

}