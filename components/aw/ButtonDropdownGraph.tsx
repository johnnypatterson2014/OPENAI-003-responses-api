'use client';

import { ReactNode } from 'react'

export default function ButtonDropdownGraph({ dropdownPosition, children }: { dropdownPosition: string, children: ReactNode }) {



    return (
        <>
            {/* <div className={`dropdown ${dropdownPosition}`}> */}
            <div className='dropdown dropdown-end'>
                <div tabIndex={0} role="button" className='icon-spacing'>

                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z" /></svg> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8 15c3.87 0 7-3.13 7-7s-3.13-7-7-7s-7 3.13-7 7s3.13 7 7 7m0 1c4.42 0 8-3.58 8-8s-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8" clipRule="evenodd" /><path fill="currentColor" d="M7.2 4.8c0-.111 0-.167.007-.214a.68.68 0 0 1 .58-.58c.046-.007.102-.007.214-.007c.11 0 .167 0 .214.007a.68.68 0 0 1 .58.58c.006.047.006.102.006.214c0 .111 0 .167-.006.214a.68.68 0 0 1-.58.58c-.047.007-.102.007-.214.007c-.111 0-.167 0-.214-.007a.68.68 0 0 1-.58-.58C7.2 4.967 7.2 4.912 7.2 4.8m0 3.2c0-.111 0-.167.007-.214a.68.68 0 0 1 .58-.58c.046-.007.102-.007.214-.007c.11 0 .167 0 .214.007a.68.68 0 0 1 .58.58c.006.047.006.102.006.214c0 .111 0 .167-.006.214a.68.68 0 0 1-.58.58c-.047.007-.102.007-.214.007c-.111 0-.167 0-.214-.007a.68.68 0 0 1-.58-.58C7.2 8.167 7.2 8.112 7.2 8m0 3.2c0-.111 0-.167.007-.214a.68.68 0 0 1 .58-.58c.046-.007.102-.007.214-.007c.11 0 .167 0 .214.007a.68.68 0 0 1 .58.58c.006.047.006.102.006.214s0 .167-.006.214a.68.68 0 0 1-.58.58c-.047.007-.102.007-.214.007c-.111 0-.167 0-.214-.007a.68.68 0 0 1-.58-.58c-.007-.047-.007-.102-.007-.214" /></svg> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path fill="currentColor" d="M186.2 139.6h139.6V0H186.2v139.6zM372.4 0v139.6H512V0H372.4zM0 139.6h139.6V0H0v139.6zm186.2 186.2h139.6V186.2H186.2v139.6zm186.2 0H512V186.2H372.4v139.6zM0 325.8h139.6V186.2H0v139.6zM186.2 512h139.6V372.4H186.2V512zm186.2 0H512V372.4H372.4V512zM0 512h139.6V372.4H0V512z" /></svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 2048 2048"><path fill="currentColor" d="M1792 128v1664H256V128h1536zm-128 128H384v1408h1280V256zm-256 768H640V896h768v128zm0 384H640v-128h768v128zm0-768H640V512h768v128z" /></svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Z" /><path d="m11 15l3-3l-3-3" /></g></svg> */}

                </div>

                {children}

            </div>

        </>
    );

}