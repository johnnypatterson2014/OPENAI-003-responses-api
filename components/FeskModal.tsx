'use client';

import { ReactNode } from 'react'
export default function FeskModal({ id, children }: { id: string, children: ReactNode }) {

  return (
    <>

      <dialog id={`${id}`} className="modal">

        <div className="modal-box w-11/12 max-w-5xl h-11/12">

          <div className='pre-scrollable overflow-auto'>
            {children}
          </div>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </>
  );

}