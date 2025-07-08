'use client';

import { promises as fs } from 'fs';
import { ChatMessage, ChatMessageWrapper } from '@/components/ChatMessageWrapper';
import ChatHistory from '@/components/ChatHistory';
import FeskDrawer from '@/components/FeskDrawer';
import ChatForm from '@/components/ChatForm';
import ChatFormMcp from '@/components/ChatFormMcp';
import ChatFormRag from '@/components/ChatFormRag';
import FileSearchSetup from "@/components/file-search-setup";
import ChatHistoryPersistence from '@/components/ChatHistoryPersistence';
import FeskButtonSecondary from '@/components/FeskButtonSecondary';
import FeskFieldset from '@/components/FeskFieldset';
import FeskLoading from '@/components/FeskLoading';
import FeskFieldsetJustifyEnd from '@/components/FeskFieldsetJustifyEnd';
import ChatImage from '@/components/ChatImage';
import ChatImageAnalysis from '@/components/ChatImageAnalysis';
import { callAgent } from '@/lib/callAgent';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'



export default function Home() {
    const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)
    const [content, setContent] = useState('no output yet')

    const sendLlmRequest = async (e?: any) => {
        e?.preventDefault();
        setIsLoadingAnswer(true);

        const response = await callAgent('tell me a joke about dogs.')
        setContent(response);
        setIsLoadingAnswer(false);
    }

    return (
        <>

            <div className="grid grid-cols-2 gap-[15px] mb-[15px] mt-[50px]">

                <div className="ml-[15px] fesk-card">

                    <div className='fesk-h2'>agents</div>

                    <div className="m-[10px]">

                        <div className="fesk-card-2">

                            <FeskDrawer name='agent testing'>

                                <FeskFieldsetJustifyEnd label='&nbsp;' buttons='&nbsp;' align='justify-end'>
                                    <div>
                                        <FeskButtonSecondary>
                                            <a onClick={sendLlmRequest}>send LLM request</a>
                                        </FeskButtonSecondary>
                                    </div>
                                    <div id='output'>
                                        {content}
                                    </div>
                                    {isLoadingAnswer && (
                                        <FeskLoading />

                                    )}
                                </FeskFieldsetJustifyEnd>


                            </FeskDrawer>


                        </div>

                    </div>


                </div>

                <div className="fesk-card mr-[15px]">
                    <p>testing</p>
                </div>

            </div>


        </>
    );
}
