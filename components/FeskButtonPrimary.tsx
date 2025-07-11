'use client';

import { ReactNode } from 'react'

export default function FeskButtonPrimary({ children }: { children: ReactNode }) {

  return (
    <>
      <div role="button" className="items-center btn btn-sm btn-primary hover:bg-zinc-100 hover:text-zinc-900">
        <div>
          {children}
        </div>
      </div>
    </>
  );

}