'use client';

import { ReactNode } from 'react'
import FeskButton3 from './FeskButton3';
import { SVG_ICON_LOAD } from '@/config/FeskConstants'

export default function FeskDrawerGraph2({ displayName, isButton, children }: { displayName: string, isButton: boolean, children: ReactNode }) {

    return (
        <>
            <div className='grow'>
                <div className="collapse">
                    <input id='collapse-checkbox' type="checkbox" />
                    <div className="collapse-title">

                        <div className="fesk-collapse-title-graph">
                            <div className="p-[0px]">

                                {
                                    isButton && (
                                        <FeskButton3>
                                            {displayName}
                                        </FeskButton3>
                                    )
                                }

                                {
                                    !isButton && (
                                        <>
                                            <div className='mt-[4px]'>
                                                {displayName}
                                            </div>
                                            {/* <div role="button" className="items-center btn btn-xs btn-ghost bg-zinc-800 hover:bg-zinc-100 border border-zinc-600 text-zinc-200 hover:text-zinc-900">
                                                <div>
                                                    {displayName}
                                                </div>
                                            </div> */}
                                        </>

                                    )
                                }



                                {/* {SVG_ICON_LOAD} */}


                            </div>

                        </div>
                    </div>

                    <div className="collapse-content">
                        <div className="p-[0px] m-[0px]">

                            <div className="fesk-collapse-graph-content">
                                <div className="p-[5px]">
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