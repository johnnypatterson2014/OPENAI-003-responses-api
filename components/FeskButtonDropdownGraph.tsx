'use client';

import { ReactNode } from 'react'

export default function FeskButtonDropdownGraph({ name, dropdownPosition, children }: { name: string, dropdownPosition: string, children: ReactNode }) {

    return (
        <>
            <div className={`dropdown ${dropdownPosition}`}>
                <div tabIndex={0} role="button" className="items-center btn btn-xs bg-zinc-800 hover:bg-zinc-100 border border-zinc-600 text-zinc-200 hover:text-zinc-900">

                    <div>
                        {name}
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M12 6a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z" /></svg> */}
                    </div>

                </div>

                {children}

            </div>

        </>
    );

}