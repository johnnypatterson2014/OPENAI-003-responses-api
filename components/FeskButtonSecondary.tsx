'use client';

import { ReactNode } from 'react'

export default function FeskButtonSecondary({ icon, children }: { icon: ReactNode, children: ReactNode }) {

  return (
    <>
      <div role="button" className="items-center btn btn-sm bg-zinc-800 hover:bg-zinc-100 border border-zinc-600 text-zinc-200 hover:text-zinc-900">
        <div>
          {icon}
        </div>
        <div>
          {children}
        </div>
      </div>
    </>
  );

}