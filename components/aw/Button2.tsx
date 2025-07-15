'use client';

import { ReactNode } from 'react'

export default function Button2({ children }: { children: ReactNode }) {

  return (
    <>
      <div role="button" className="items-center btn btn-xs bg-zinc-800 hover:bg-zinc-100 border border-zinc-600 text-zinc-200 hover:text-zinc-900">
        <div>
          {children}
        </div>
      </div>
    </>
  );

}