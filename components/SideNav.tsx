'use client';

import Link from 'next/link';
import { usePathname } from "next/navigation";
import FeskButton3 from '@/components/FeskButton3';

export default function SideNav() {

    const pathname = usePathname();

    const handleClick = () => {
        const toggleButton = document.getElementById('toggle-btn');
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('close');
        toggleButton.classList.toggle('rotate')
    };
    // console.log(pathname);

    return (
        <>

            <nav id="sidebar">
                <div className='flex justify-items-end mr-[5px]'>
                    <div id="toggle-btn" className="btn btn-xs pl-[2px] pr-[2px] bg-zinc-800 hover:bg-zinc-600 border border-zinc-600 text-zinc-200 hover:text-zinc-700"
                        onClick={handleClick} >
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#6e9fff"><path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" /></svg>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <div className='flex-none ml-[5px]'>
                        <div className='p-[5px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path stroke="none" fill="#6e9fff" d="m12 1.198l10 8.334V22H2V9.532l10-8.334ZM10 20h4v-5h-4v5Zm6 0h4v-9.532l-8-6.666l-8 6.666V20h4v-7h8v7Z" /></svg>
                        </div>
                    </div>

                    <div className='flex-1 ml-[10px]'>

                        <div className='text-sm'>
                            <Link href={'/'}>Home</Link>
                        </div>

                    </div>

                </div>

                <div className='flex flex-row items-center'>
                    <div className='flex-none ml-[5px]'>
                        <div className='p-[5px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#6e9fff" d="M1.5 2h21v16H6.876L1.5 22.704V2Zm2 2v14.296L6.124 16H20.5V4h-17Z" /></svg>
                        </div>
                    </div>

                    <div className='flex-1 ml-[10px]'>

                        <div className='text-sm'>
                            <Link href={'/chat'}>chat</Link>
                        </div>

                    </div>

                </div>

                <div className='flex flex-row items-center'>
                    <div className='flex-none ml-[5px]'>
                        <div className='p-[5px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>
                        </div>
                    </div>

                    <div className='flex-1 ml-[10px]'>

                        <div className='text-sm'>
                            <Link href={'/trace'}>trace</Link>
                        </div>

                    </div>

                </div>

                <div className='flex flex-row items-center'>
                    <div className='flex-none ml-[5px]'>
                        <div className='p-[5px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>
                        </div>
                    </div>

                    <div className='flex-1 ml-[10px]'>

                        <div className='text-sm'>
                            <Link href={'/agent'}>agent</Link>
                        </div>

                    </div>

                </div>

                <div className='flex flex-row items-center'>
                    <div className='flex-none ml-[5px]'>
                        <div className='p-[5px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>
                        </div>
                    </div>

                    <div className='flex-1 ml-[10px]'>

                        <div className='text-sm'>
                            <Link href={'/crewai'}>crewai</Link>
                        </div>

                    </div>

                </div>

                <div className='flex flex-row items-center'>
                    <div className='flex-none ml-[5px]'>
                        <div className='p-[5px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>
                        </div>
                    </div>

                    <div className='flex-1 ml-[10px]'>

                        <div className='text-sm'>
                            <Link href={'/workflow'}>workflow</Link>
                        </div>

                    </div>

                </div>

            </nav>

            {/* <nav id="sidebar">
                <ul>
                    <li>
                        <span className="logo mr-[10px]">&nbsp;</span>

                        <div id="toggle-btn" className="btn btn-sm bg-zinc-800 hover:bg-zinc-100 border border-zinc-600 text-zinc-200 hover:text-zinc-900"
                            onClick={handleClick} >
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" /></svg>
                        </div>




                    </li>

                    <li>

                        <ul id="nav-menu-wrapper" className="menu w-full">

                            <li className={pathname === "/" ? "active text-sm flex-1" : "text-sm flex-1"}>
                                <Link id='link-1' href={'/'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" /><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" /></svg>
                                    <span>Home</span>
                                </Link>

                            </li>

                            <li className={pathname === "/chat" ? "active text-sm flex-1" : "text-sm flex-1"}>
                                <Link id='link-2' href={'/chat'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                    <span>Chat</span>
                                </Link>

                            </li>



                        </ul>

                    </li>

                </ul>

            </nav > */}

        </>
    );

}