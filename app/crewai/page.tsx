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
import { sendTracePersistenceRequest, saveTrace, saveTreeTrace, getTreeTrace } from '@/lib/sendTracePersistenceRequest'
import { TraceTreeItem, crewai_testrun_1, TraceTimeTreeItem } from '@/config/FeskConstants'
import TraceItemComponent from '@/components/TraceItemComponent';
import TraceTreeItemComponent from '@/components/TraceTreeItemComponent';
import FeskModal from '@/components/FeskModal'
import JsonResponseObject from '@/components/JsonResponseObject'
import next from 'next';
import { Input } from "@/components/ui/input";

import FeskTraceGraph from '@/components/FeskTraceGraph';




export default function Home() {
    const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)
    // const [content, setContent] = useState('no output yet')
    const [traceList, setTraceList] = useState<any[]>([])
    const [traceTreeList, setTraceTreeList] = useState<TraceTreeItem[]>([])
    const [masterTraceTimeTreeList, setMasterTraceTimeTreeList] = useState<TraceTimeTreeItem[]>([])
    // const [isExistingTraces, setIsExistingTraces] = useState(false)
    // const [traceIdIgnoreList, setTraceIdIgnoreList] = useState<string[]>([])
    // let traceIdIgnoreListTemp: string[] = [];
    const masterTreeList: TraceTimeTreeItem[] = []
    const masterTreeListCorrected: TraceTimeTreeItem[] = []

    //     export interface TraceTimeTreeItem {
    //     trace_id: string
    //     name: string
    //     start_time: number
    //     end_time: number
    //     parent_trace_id?: string
    //     children?: TraceTimeTreeItem[]
    // }
    const tempRoot: TraceTimeTreeItem = {
        trace_id: 'root_trace_id',
        name: 'root',
        start_time: 0,
        end_time: 0,
        parent_trace_id: 'none'
    }
    // setMasterTraceTimeTreeList([tempRoot])

    const saveTraceTree = async (e?: any) => {
        e?.preventDefault();
        const sessionName = document.getElementById('trace_tree')?.value;
        saveTreeTrace(sessionName, masterTraceTimeTreeList)
    }

    const loadTraceTree = async (e?: any) => {
        e?.preventDefault();
        const data = await getTreeTrace()
        // console.log(data[0])
        setMasterTraceTimeTreeList(data[0].traceBody)
        console.log('Successfully loaded trace tree from the DB.')
    }


    const getLangsmithTraceById = async (trace_id: string) => {
        setIsLoadingAnswer(true);
        let data = null;
        try {
            // const isInIgnoreList = traceIdIgnoreListTemp.find(item => item === trace_id)? true: false;
            // if (isInIgnoreList) {

            // }
            const foundItem = traceList.find(item => item.id === trace_id);
            if (foundItem) {
                console.log('foundItem is in traceList. No need to call API to get the trace.')
                return foundItem.traceBody;
            } else {
                console.log('foundItem is NOT in traceList. Calling API to get the trace.')
                data = await getLangsmithTrace(trace_id)
                const mapOfData = {
                    id: trace_id,
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
        console.log('Successfully loaded traces from the DB.')
        // alert('Successfully loaded traces from the DB.')
    }

    const parseTraces = async (trace_id: string, isGetChildren: boolean, e?: any) => {
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

        if (isGetChildren) {
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
        }

        setTraceTreeList([...traceTreeList, rootTrace])

        setIsLoadingAnswer(false);
        console.log('Successfully parsed traces.')
        // alert('Successfully parsed traces.')
    }


    const parseChildTraceRecursive = async (trace_id: string, parent_trace_id: string) => {
        console.log('-------------------- processing trace_id: ' + trace_id);

        let currentItem = await getLangsmithTraceById(trace_id)
        const traceName = currentItem.name;
        const isAllowedName: boolean = traceName == 'RunnableSequence' || traceName == 'ChatOpenAI' || traceName == 'CrewAgentParser' || traceName == 'RunnableParallel<input,tools,tool_names,agent_scratchpad>'
        // const isAllowedName = true;
        if (!isAllowedName) {
            console.log('Name: ' + traceName + ' is not in the allowed list. Will skip.')
            // traceIdIgnoreListTemp.push(trace_id)
            return null;
        } else {

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
        }

    }


    const parseTraceTimeItemRecursive = (parent_trace_id: string, current: TraceTreeItem, numberOfChildren: number) => {
        console.log('parent: ' + parent_trace_id + ': parsing child: ' + current.trace_id)
        const currentTraceTreeItem: TraceTimeTreeItem = {
            trace_id: current.trace_id,
            name: current.traceBody.name,
            start_time: Date.parse(current.traceBody.events[0].time),
            end_time: Date.parse(current.traceBody.events[1].time),
            parent_trace_id: parent_trace_id
        }
        // console.log('currentTraceTreeItem: ' + JSON.stringify(currentTraceTreeItem))
        masterTreeList.push(currentTraceTreeItem)

        if (current.children) {
            for (let y = 0; y < current.children.length; y++) {
                parseTraceTimeItemRecursive(current.trace_id, current.children[y], current.children?.length);
            }
        }

    }

    const sortTraceTree = async (e?: any) => {
        e?.preventDefault();
        setIsLoadingAnswer(true);

        let isInsideCrewAgentExecutor: boolean = false

        // create master parent
        let treeRoot: TraceTimeTreeItem = {
            trace_id: 'root_trace_id',
            name: 'root_trace',
            parent_trace_id: 'none',
            start_time: 0,
            end_time: 0,
            children: []
        }
        console.log('root item: ' + JSON.stringify(treeRoot))
        masterTreeList.push(treeRoot)

        // -------------------------- create masterTreeList - flat list of all traces

        for (let i = 0; i < traceTreeList.length; i++) {

            const child: TraceTimeTreeItem = {
                trace_id: traceTreeList[i].trace_id,
                name: traceTreeList[i].traceBody.name,
                //const startTimeDate: new Date(traceTreeList[i].traceBody.events[0].time);
                start_time: Date.parse(traceTreeList[i].traceBody.events[0].time),
                end_time: Date.parse(traceTreeList[i].traceBody.events[1].time),
                parent_trace_id: 'root_trace_id'
            }

            // console.log('child item: ' + JSON.stringify(child))
            masterTreeList.push(child)
            if (traceTreeList[i].children && traceTreeList[i].children?.length > 0) {
                for (let y = 0; y < traceTreeList[i].children?.length; y++) {
                    console.log('parsing root child elements.')
                    parseTraceTimeItemRecursive(traceTreeList[i].trace_id, traceTreeList[i].children[y], traceTreeList[i].children?.length);
                }
            }

        }

        // masterTreeList now has all items
        // sort masterTreeList by start time
        console.log('items in masterTreeList: ' + masterTreeList.length);
        masterTreeList.sort((a, b) => a.start_time - b.start_time);
        for (let i = 0; i < masterTreeList.length; i++) {
            console.log(i + ' | ' + masterTreeList[i].trace_id + ' | ' + masterTreeList[i].parent_trace_id)
        }

        // --------------------------------- fix children
        let run_trace_end = masterTreeList[1].end_time
        console.log('Setting starting run trace end_time: ' + run_trace_end)
        for (let i = 2; i < masterTreeList.length; i++) {
            // check if we have a new CrewAgentExecutor
            if (masterTreeList[i].parent_trace_id === 'root_trace_id') {
                // check if the start time is before the end of the previous run
                if (masterTreeList[i].start_time < run_trace_end) {
                    // we have a nested run
                    // set the parent to the current run
                    console.log('We have a nested CrewAgentExecutor: ' + masterTreeList[i].trace_id)
                    // update parent to be the previous sibling's parent
                    console.log('Updating parent to: ' + masterTreeList[i - 1].parent_trace_id)
                    masterTreeList[i].parent_trace_id = masterTreeList[i - 1].parent_trace_id
                    run_trace_end = masterTreeList[i].end_time
                    console.log('Setting new run trace end_time: ' + run_trace_end)
                } else {
                    // we have a new CrewAgentExecutor. Reset run trace values
                    console.log('We have a new CrewAgentExecutor: ' + masterTreeList[i].trace_id)
                    run_trace_end = masterTreeList[i].end_time
                    console.log('Setting new run trace end_time: ' + run_trace_end)
                }
            }
        }

        console.log('items in masterTreeList: ' + masterTreeList.length);
        for (let i = 0; i < masterTreeList.length; i++) {
            console.log(i + ' | ' + masterTreeList[i].trace_id + ' | ' + masterTreeList[i].parent_trace_id)
        }

        // --------------------------------- recreate tree with nested child objects
        createMasterTreeListCorrected();
        console.log('final masterTreeListCorrected: ')
        console.log(JSON.stringify(masterTreeListCorrected, null, 2))

        // --------------------------------- add trace body to all TraceTimeTreeItem
        // const rootItem = masterTreeListCorrected[0]
        // rootItem.traceBody = null;
        // getTraceBodyForMasterTreeCorrected(rootItem)

        setMasterTraceTimeTreeList(masterTreeListCorrected)

        setIsLoadingAnswer(false);
    }

    const getTraceBodyForMasterTreeCorrected = (item: TraceTimeTreeItem) => {
        if (item.children && item.children.length > 0) {
            for (let i = 0; i < item.children.length; i++) {
                const currentItem = item.children[i]
                const foundItem = traceList.find(item2 => item2.id === currentItem.trace_id);
                // currentItem.traceBody = foundItem.traceBody
                getTraceBodyForMasterTreeCorrected(item)
            }
        }
    }

    const createMasterTreeListCorrected = () => {
        const item = { ...masterTreeList[0] }
        item.children = getChildren(item.trace_id)
        masterTreeListCorrected.push(item)
    }

    const getChildren = (parent_trace_id: string) => {
        const children: TraceTimeTreeItem[] = []
        for (let i = 0; i < masterTreeList.length; i++) {
            if (masterTreeList[i].parent_trace_id == parent_trace_id) {
                children.push(masterTreeList[i])
            }
        }
        if (children.length > 0) {
            // recursively get the children
            for (let y = 0; y < children.length; y++) {
                children[y].children = getChildren(children[y].trace_id)
            }
        }
        return children
    }


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




                                            <div className='justify-end'>
                                                <FeskButtonSecondary>
                                                    <a onClick={getSavedTraces}>load traces from DB</a>
                                                </FeskButtonSecondary>
                                            </div>

                                            <div>


                                                {crewai_testrun_1.map((item, i) => (

                                                    <div key={`testrun-trace-${i}`} className='flex items-center justify-end'>
                                                        <div className='flex-none mb-[10px] mr-[10px] fesk-item'>
                                                            <div>{item.name}</div>
                                                        </div>
                                                        <div className='flex-none mb-[10px] mr-[10px] fesk-item'>
                                                            <div>{item.assigned_agent}</div>
                                                        </div>
                                                        {/* <div className='fesk-item flex-none mr-[10px] mb-[10px]'>
                                                            <div>{item.id}</div>
                                                        </div> */}

                                                        <div className='flex-none mr-[10px] mb-[10px]'>
                                                            <FeskButton3>
                                                                <a href='#' onClick={() => getLangsmithTraceById(item.id)}>get traces</a>
                                                            </FeskButton3>
                                                        </div>

                                                        <div className='flex-none mr-[10px] mb-[10px]'>


                                                            <FeskButton3>
                                                                <a href='#' onClick={() => parseTraces(item.id, true)}>generate trace flow</a>
                                                            </FeskButton3>


                                                        </div>
                                                    </div>

                                                ))

                                                }

                                            </div>

                                            <div className='justify-end'>
                                                <FeskButtonSecondary>
                                                    <a onClick={sortTraceTree}>process trace tree</a>
                                                </FeskButtonSecondary>
                                            </div>

                                            <div className='justify-end'>
                                                <FeskButtonSecondary>
                                                    <a onClick={loadTraceTree}>load trace tree</a>
                                                </FeskButtonSecondary>
                                            </div>

                                            <div className='m-[10px]'>
                                                &nbsp;
                                            </div>


                                            <FeskFieldset label='trace name' buttons='' align='items-center'>
                                                <Input
                                                    id="trace_tree"
                                                    name="trace_tree"
                                                    type="text"
                                                    className="bg-zinc-900 border border-zinc-600 text-sm flex-1 text-zinc-300"
                                                    placeholder='Name for trace tree'
                                                />

                                                <FeskButtonSecondary><a onClick={saveTraceTree}>Save trace tree</a></FeskButtonSecondary>
                                            </FeskFieldset>

                                            {isLoadingAnswer && (
                                                <FeskLoading />

                                            )
                                            }

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

                    <div className="p-[10px]">

                        {/* <FeskDrawer name='RootCrewExecution'>

                            {masterTraceTimeTreeList && masterTraceTimeTreeList.length > 0 && masterTraceTimeTreeList[0].children?.map((child, i) => {
                                const foundItem = traceList.find(item => item.id === child.trace_id);
                                return (
                                    <div key={`child-${i}`}>
                                        <TraceTreeItemComponent item={child} traceItem={foundItem} traceList={traceList} displayName={child.name} />
                                    </div>
                                )
                            })}

                        </FeskDrawer> */}




                        {
                            // const foundItem = traceList.find(item => item.id === child.trace_id);
                            masterTraceTimeTreeList && (masterTraceTimeTreeList.length > 0) && (

                                <FeskTraceGraph traceTimeTree={masterTraceTimeTreeList} traceList={traceList} displayName='Trace Graph Root' />

                            )
                        }




                        {/* <TraceTreeItemComponent item={masterTraceTimeTreeList[0]} traceList={traceList} displayName='RootCrewExecution' /> */}

                        {/* {traceTreeList?.map((child, i) => {
                            return (
                                <div key={`${child.trace_id}-child-${i}`}>
                                    <TraceItemComponent item={child} traceList={traceList} displayName={child.traceBody.name} />
                                </div>
                            )
                        })} */}




                    </div>


                </div>

            </div >




        </>
    );
}
