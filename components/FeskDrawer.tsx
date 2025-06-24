'use client';

import { ReactNode } from 'react'

export default function FeskDrawer({ name, children }: { name: string, children: ReactNode }) {

    return (
        <>
            <div className="collapse">
                <input id='collapse-checkbox' type="checkbox" />
                <div className="collapse-title">

                    <div className="fesk-collapse-title">
                        <div className="p-[5px]">
                            {name}
                            <div className="float-right pr-[10px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffffff" d="M12 6a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z" /></svg>
                            </div>
                        </div>

                    </div>




                </div>
                <div className="collapse-content">
                    <div className="p-[1px] m-[0px]">

                        <div className="fesk-collapse-title-2">
                            <div className="p-[10px]">

                                {children}
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    );

}