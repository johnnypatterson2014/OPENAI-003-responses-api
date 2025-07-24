'use client';

import { ReactNode } from 'react'
import Button2 from '@/components/aw/Button2'

export default function Drawer_v2({ name, children }: { name: string, children: ReactNode }) {

    return (
        <>
            <div className="collapse">
                <input id='collapse-checkbox' className='aw-collapse-checkbox' type="checkbox" />
                <div className="collapse-title">

                    <div className="flex flex-row aw-collapse-title items-center">
                        {/* <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>
                        </div> */}
                        {/* <div className="aw-drawer-title">
                            {name}
                        </div> */}
                        <Button2>
                            {name}
                        </Button2>

                    </div>




                </div>
                <div className="collapse-content">
                    <div className="p-[0px] m-[0px]">

                        <div className="aw-collapse-content">
                            <div className="p-[0px] mb-[15px]">

                                {children}
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    );

}