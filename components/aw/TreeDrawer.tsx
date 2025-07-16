'use client';

import { ReactNode } from 'react'
import { SVG_ICON_LOAD } from '@/config/FeskConstants'
import Button2 from '@/components/aw/Button2'

export default function TreeDrawer({ id, displayName, isButton, children }: { id: string, displayName: string, isButton: boolean, children: ReactNode }) {

    return (
        <>
            <div className='grow'>
                <div className="collapse">
                    <input className='fesk-checkbox' id={id} type="checkbox" />
                    <div className="collapse-title">

                        <div className="fesk-collapse-title-graph">
                            <div className="pb-[5px]">

                                {
                                    isButton && (
                                        <Button2>
                                            {displayName}
                                        </Button2>
                                    )
                                }

                                {
                                    !isButton && (
                                        <>
                                            <div className='mt-[4px]'>
                                                {displayName}
                                            </div>

                                        </>

                                    )
                                }

                            </div>

                        </div>
                    </div>

                    <div className="collapse-content">
                        <div className="p-[0px] m-[0px]">

                            <div className="fesk-collapse-graph-content">
                                <div className="pt-[5px] pr-[5px] pl-[5px] pb-[0px]">
                                    {children}
                                </div>

                            </div>

                        </div>



                    </div>
                </div>
            </div>
        </>
    );

}