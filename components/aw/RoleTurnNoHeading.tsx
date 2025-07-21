'use client';

import { ReactNode } from 'react'

export default function RoleTurnNoHeading({ children }: { children: ReactNode }) {

    return (
        <>
            <div className='grid grid-cols-1'>

                <div className='w-9/10 max-w-9/10 aw-roleturn-body aw-overflow-wrap'>

                    {children}

                </div>

            </div>


        </>
    );

}