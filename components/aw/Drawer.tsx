'use client';

import { ReactNode } from 'react'

export default function Drawer({ name, children }: { name: string, children: ReactNode }) {

    return (
        <>
            <div className="collapse">
                <input id='collapse-checkbox' className='aw-collapse-checkbox' type="checkbox" />
                <div className="collapse-title">

                    <div className="flex flex-row aw-collapse-title items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>
                        </div>
                        <div className="aw-drawer-title">
                            {name}
                        </div>
                        <div className="grow pr-[10px]">
                            <div className='flex flex-row'>
                                <div className='flex-1'>
                                    &nbsp;
                                </div>
                                <div className='flex-none'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffffff" d="M12 6a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z" /></svg>
                                </div>

                            </div>
                        </div>
                    </div>




                </div>
                <div className="collapse-content">
                    <div className="p-[1px] m-[0px]">

                        <div className="aw-collapse-content">
                            <div className="p-[5px]">

                                {children}
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    );

}