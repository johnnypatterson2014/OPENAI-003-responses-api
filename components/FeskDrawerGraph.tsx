'use client';

import { ReactNode } from 'react'
import FeskButton3 from './FeskButton3';
import { SVG_ICON_LOAD } from '@/config/FeskConstants'

export default function FeskDrawerGraph({ children }: { children: ReactNode }) {

    return (
        <>
            <div className="collapse">
                <input id='collapse-checkbox' type="checkbox" />
                <div className="collapse-title">

                    <div className="fesk-collapse-title-graph">
                        <div className="p-[0px]">

                            {/* <FeskButton3>
                                {SVG_ICON_LOAD}
                            </FeskButton3> */}

                            {SVG_ICON_LOAD}


                        </div>

                    </div>
                </div>

                <div className="collapse-content">
                    <div className="p-[0px] m-[0px]">

                        <div className="fesk-collapse-graph-content">
                            <div className="p-[0px]">
                                {children}
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    );

}