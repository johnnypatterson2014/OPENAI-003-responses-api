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
import FeskButton3 from '@/components/FeskButton3';
import FeskFieldset2 from '@/components/FeskFieldset2';
import FeskLoading from '@/components/FeskLoading';
import FeskFieldsetJustifyEnd2 from '@/components/FeskFieldsetJustifyEnd2';
import ChatImage from '@/components/ChatImage';
import ChatImageAnalysis from '@/components/ChatImageAnalysis';
import { getLangsmithTrace } from '@/lib/getLangsmithTrace';
import FeskFieldset from '@/components/FeskFieldset';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import FeskFieldsetJustifyEnd from '@/components/FeskFieldsetJustifyEnd';
import { sendTracePersistenceRequest, saveTrace } from '@/lib/sendTracePersistenceRequest'
import { TraceTreeItem } from '@/config/FeskConstants'
import TraceItemComponent from '@/components/TraceItemComponent';
import FeskModal from '@/components/FeskModal'
import JsonResponseObject from '@/components/JsonResponseObject'


const trace_id = 'f056bb6a-d18b-441e-91eb-cdb842154e86';

export default function Home() {
    const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)
    const [content, setContent] = useState('no output yet')
    const [traceList, setTraceList] = useState<any[]>([])
    const [traceTreeList, setTraceTreeList] = useState<TraceTreeItem[]>([])
    // const [isExistingTraces, setIsExistingTraces] = useState(false)
    // const [traceIdIgnoreList, setTraceIdIgnoreList] = useState<string[]>([])
    // let traceIdIgnoreListTemp: string[] = [];

    const getLangsmithTraceById = async (trace_id: string) => {
        setIsLoadingAnswer(true);
        let data = null;
        try {
            const foundItem = traceList.find(item => item.id === trace_id);
            if (foundItem) {
                console.log('foundItem is in traceList. No need to call API to get the trace.')
                return foundItem.traceBody;
            } else {
                console.log('foundItem is NOT in traceList. Calling API to get the trace.')
                data = await getLangsmithTrace(trace_id)
                const mapOfData = {
                    id: trace_id,
                    name: trace_id,
                    traceBody: data
                }
                setTraceList([...traceList, mapOfData])
                saveTrace(mapOfData)
            }
        } finally {
            setIsLoadingAnswer(false)
        }
        return data;
    }

    const getSavedTraces = async (e?: any) => {
        e?.preventDefault();
        setIsLoadingAnswer(true);
        try {
            const data = await sendTracePersistenceRequest();
            setTraceList(data);
            // const foundItem = data.find(item => item.id === trace_id);
            // await parseTraces(trace_id, foundItem)
            // setIsExistingTraces(true)
        } finally {
            setIsLoadingAnswer(false);
        }
        alert('Successfully loaded traces from the DB.')
    }

    const parseTraces = async (e?: any) => {
        e?.preventDefault();
        setIsLoadingAnswer(true);
        const foundItem = traceList.find(item => item.id === trace_id);
        console.log('trace_id: ' + trace_id)
        console.log('direct_child_run_ids: ' + JSON.stringify(foundItem.traceBody.direct_child_run_ids, null, 2))

        const rootTrace: TraceTreeItem = {
            trace_id: foundItem.id,
            name: foundItem.traceBody.name,
            input: foundItem.traceBody.inputs.input,
            child_ids: foundItem.traceBody.direct_child_run_ids,
            traceBody: foundItem.traceBody
        }

        //     trace_id: string
        //     name?: string
        //     agent_name?: string
        //     input?: string
        //     output?: string
        //     child_ids?: string[]
        //     parent_id?: string
        //     children?: TraceTreeItem[]
        //     traceBody?: any

        // const isRunnableParallel: boolean = rootTrace.name === 'RunnableParallel<input,tools,tool_names,agent_scratchpad>'

        if (rootTrace.child_ids) {

            const children: TraceTreeItem[] = []
            for (const child_id of rootTrace.child_ids) {
                const childTrace = await parseChildTraceRecursive(child_id, trace_id)
                if (childTrace) {
                    children.push(childTrace)
                }

            }
            rootTrace.children = children

        }

        setTraceTreeList([rootTrace])

        setIsLoadingAnswer(false);
        alert('Successfully parsed traces.')
    }


    const parseChildTraceRecursive = async (trace_id: string, parent_trace_id: string) => {
        console.log('-------------------- processing trace_id: ' + trace_id);

        let currentItem = await getLangsmithTraceById(trace_id)
        const traceName = currentItem.name;
        // const isAllowedName: boolean = traceName == 'RunnableSequence' || traceName == 'ChatOpenAI' || traceName == 'CrewAgentParser'
        // const isAllowedName = true;
        // if (!isAllowedName) {
        //     console.log('Name: ' + traceName + ' is not in the allowed list. Will skip.')
        //     // traceIdIgnoreListTemp.push(trace_id)
        //     return null;
        // } else {

        const isRunnableParallel: boolean = traceName === 'RunnableParallel<input,tools,tool_names,agent_scratchpad>'


        let currentTrace: TraceTreeItem = {
            trace_id: trace_id,
            parent_id: parent_trace_id,
            name: currentItem.name,
            // child_ids: currentItem.direct_child_run_ids,
            traceBody: currentItem
        }

        if (!isRunnableParallel) {
            currentTrace.child_ids = currentItem.direct_child_run_ids
        }

        if (currentTrace.child_ids) {
            console.log('trace_id: ' + trace_id + ' has children. Performing recursive call.')
            let childTraces: TraceTreeItem[] = []
            for (const child_id of currentTrace.child_ids) {
                const childTrace = await parseChildTraceRecursive(child_id, trace_id)
                if (childTrace) {
                    console.log('adding child: ' + child_id)
                    childTraces.push(childTrace);
                }

            }
            console.log('finished recursive loop for children for trace_id: ' + trace_id)
            currentTrace.children = childTraces;
        }
        // setTraceIdIgnoreList(traceIdIgnoreListTemp);
        console.log('-------------------- finished processing for trace_id: ' + trace_id)
        return currentTrace;
        // }

    }

    const isExistingTraceTree = (traceTreeList != null && traceTreeList.length > 0);

    return (
        <>

            <div className="grid grid-cols-2 gap-[15px] mb-[15px] mt-[50px]">

                <div className="ml-[15px] fesk-card">

                    <div className='fesk-h2'>crewai test 1</div>

                    <div className="m-[10px]">

                        <div className="fesk-card-2">

                            <FeskDrawer name='saved traces'>
                                <div className='chat-text-area-wrapper'>
                                    <form id='chat-form-session'>

                                        <div>




                                            <FeskFieldsetJustifyEnd label='&nbsp;' buttons='&nbsp;' align='justify-end'>

                                                <div className='flex flex-row'>
                                                    <div className='mr-[10px]'>
                                                        <FeskButtonSecondary>
                                                            <a onClick={getSavedTraces}>load traces from DB</a>
                                                        </FeskButtonSecondary>
                                                    </div>

                                                    <div>
                                                        <FeskButtonSecondary>
                                                            <a onClick={parseTraces}>parse traces</a>
                                                        </FeskButtonSecondary>
                                                    </div>
                                                </div>

                                                {/* <div className='grid grid-cols-2'>
                                                    <div className='pr-[10px]'>
                                                        <FeskButtonSecondary>
                                                            <a onClick={getParentTrace}>Get parent trace</a>
                                                        </FeskButtonSecondary>
                                                    </div>

                                                    <div>
                                                        <FeskButtonSecondary>
                                                            <a onClick={getSavedTraces}>Get saved traces</a>
                                                        </FeskButtonSecondary>
                                                    </div>
                                                </div> */}
                                            </FeskFieldsetJustifyEnd>


                                            {/* <FeskFieldset label='saved traces' buttons='&nbsp;' align='items-start'>

                                                {isLoadingAnswer && (
                                                    <FeskLoading />

                                                )
                                                }

                                                {
                                                    !(traceList != null && traceList.length > 0) && (
                                                        <div className='flex justify-end'>
                                                            <div className='flex-none fesk-muted'>(no traces)</div>
                                                        </div>
                                                    )
                                                }

                                                 {(traceList != null && traceList.length > 0) && traceList.map((item, i) => (

                                                    <div key={`trace-${i}`} className='flex items-center'>
                                                        <div className='flex-1 mb-[10px] fesk-item justify-items-end'>
                                                            <div>{item.name}</div>
                                                        </div>

                                                        <div className='flex-none ml-[10px] mb-[10px]'>


                                                            <FeskButton3>
                                                                <a href='#' onClick={() => parseTraces(item.id)}>restore</a>
                                                            </FeskButton3>


                                                        </div>
                                                    </div>

                                                ))} 

                                            </FeskFieldset> */}



                                        </div>


                                    </form>
                                </div >
                            </FeskDrawer>














                            <FeskDrawer name='crewai trace testing'>

                                <div className='flex flex-row m-[10px] text-sm items-start'>
                                    <div>
                                        <div className='fesk-h2'>
                                            Agent: Online Researcher
                                        </div>

                                        <p className='fesk-item'>
                                            goal: Research the topic online <br />
                                            backstory:
                                            Your primary role is to function as an intelligent online research assistant, adept at scouring
                                            the internet for the latest and most relevant trending stories across various sectors like politics, technology,
                                            health, culture, and global events. You possess the capability to access a wide range of online news sources,
                                            blogs, and social media platforms to gather real-time information.
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-row m-[10px] text-sm items-start'>
                                    <div>
                                        <div className='fesk-h2'>
                                            Agent: Blog Manager
                                        </div>

                                        <p className='fesk-item'>
                                            goal: Write the blog article <br />
                                            backstory:
                                            You are a Blog Manager. The role of a Blog Manager encompasses several critical responsibilities aimed at transforming initial drafts into polished, SEO-optimized blog articles that engage and grow an audience. Starting with drafts provided by online researchers, the Blog Manager must thoroughly understand the content, ensuring it aligns with the blog's tone, target audience, and thematic goals. Key responsibilities include...
                                        </p>
                                    </div>

                                </div>

                                <div className='flex flex-row m-[10px] text-sm items-start'>
                                    <div>
                                        <div className='fesk-h2'>
                                            Agent: Social Media Manager
                                        </div>

                                        <p className='fesk-item'>
                                            goal: Write a tweet <br />
                                            backstory:
                                            You are a Social Media Manager. The role of a Social Media Manager, particularly for managing Twitter content, involves transforming research drafts into concise, engaging tweets that resonate with the audience and adhere to platform best practices. Upon receiving a draft from an online researcher, the Social Media Manager is tasked with several critical functions...
                                        </p>
                                    </div>

                                </div>

                                <div className='flex flex-row m-[10px] text-sm items-start'>
                                    <div>
                                        <div className='fesk-h2'>
                                            Agent: Content Marketing Manager
                                        </div>

                                        <p className='fesk-item'>
                                            goal: Manage the Content Marketing Team <br />
                                            backstory:
                                            You are an excellent Content Marketing Manager. Your primary role is to supervise each publication from the 'blog manager'
                                            and the tweets written by the 'social media manager' and approve the work for publication. Examine the work and regulate violent language, abusive content and racist content.

                                            Capabilities:

                                            Editorial Review: Analyze the final drafts from the blog manager and the social media manager for style consistency, thematic alignment, and overall narrative flow.

                                            Quality Assurance: Conduct detailed checks for grammatical accuracy, factual correctness, and adherence to journalistic standards in the news content, as well as creativity and effectiveness in the advertisements.

                                            Feedback Loop: Provide constructive feedback to both the blog manager and social media manager, facilitating a collaborative environment for continuous improvement in content creation and presentation.
                                        </p>
                                    </div>

                                </div>


                                <div className='flex flex-row m-[10px] text-sm items-start'>
                                    <div>
                                        <div className='fesk-h2'>
                                            Task 1
                                        </div>

                                        <p className='fesk-item'>
                                            description: Write me a report on Agentic Behavior. After the research on Agentic Behavior,pass the
                                            findings to the blog manager to generate the final blog article. Once done, pass it to the social media
                                            manager to write a tweet on the subject.
                                            <br />
                                            expected_output: Report on Agentic Behavior
                                            <br />
                                            agent: online_researcher
                                        </p>
                                    </div>

                                </div>

                                <div className='flex flex-row m-[10px] text-sm items-start'>
                                    <div>
                                        <div className='fesk-h2'>
                                            Task 2
                                        </div>

                                        <p className='fesk-item'>
                                            description: Using the research findings of the news correspondent, write an article for the blog.
                                            The publication should contain links to sources stated by the online researcher.
                                            Your final answer MUST be the full blog post of at least 3 paragraphs.
                                            <br />
                                            expected_output: Blog Article
                                            <br />
                                            agent: blog_manager
                                        </p>
                                    </div>

                                </div>

                                <div className='flex flex-row m-[10px] text-sm items-start'>
                                    <div>
                                        <div className='fesk-h2'>
                                            Task 3
                                        </div>

                                        <p className='fesk-item'>
                                            description: Using the research findings of the news correspondent, write a tweet. Your final answer MUST be the full tweet.
                                            <br />
                                            expected_output: Tweet
                                            <br />
                                            agent: social_media_manager
                                        </p>
                                    </div>

                                </div>

                                <div className='flex flex-row m-[10px] text-sm items-start'>
                                    <div>
                                        <div className='fesk-h2'>
                                            Task 4
                                        </div>

                                        <p className='fesk-item'>
                                            description: To meticulously review and harmonize the final output from both the blog manager and social media manager, ensuring cohesion and excellence in the final publication. Once done, publish the final report.
                                            <br />
                                            expected_output: Final Report
                                            <br />
                                            agent: content_marketing_manager
                                        </p>
                                    </div>

                                </div>






                            </FeskDrawer>


                        </div>

                    </div>


                </div >



                <div className="fesk-card mr-[15px]">
                    <div className='fesk-h2'>trace</div>

                    <div className="fesk-item m-[10px]">

                        Trace ID for session/project: <br />
                        f056bb6a-d18b-441e-91eb-cdb842154e86 <br /><br />


                    </div>

                    <div className="p-[10px]">

                        {
                            isExistingTraceTree && (
                                <TraceItemComponent item={traceTreeList[0]} traceList={traceList} />
                            )
                        }

                    </div>


                </div>

            </div >




        </>
    );
}
