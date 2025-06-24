'use client';

import { ReactNode } from 'react'

export default function FeskButtonDropdown({ name, icon, dropdownPosition, children }: { name: string, icon: ReactNode, dropdownPosition: string, children: ReactNode }) {

    return (
        <>
            <div className={`dropdown ${dropdownPosition}`}>
                <div tabIndex={0} role="button" className="items-center btn btn-sm bg-zinc-800 hover:bg-zinc-100 border border-zinc-600 text-zinc-200 hover:text-zinc-900">

                    <div>
                        {icon}
                    </div>
                    <div>
                        {name}
                    </div>

                </div>

                {children}

            </div>

        </>
    );

}