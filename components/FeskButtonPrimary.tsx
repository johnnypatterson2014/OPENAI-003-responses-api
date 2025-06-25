'use client';

import { ReactNode } from 'react'

export default function FeskButtonPrimary({ icon, children }: { icon: ReactNode, children: ReactNode }) {

  return (
    <>
      <div role="button" className="items-center btn btn-sm btn-primary hover:bg-zinc-100 hover:text-zinc-900">
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