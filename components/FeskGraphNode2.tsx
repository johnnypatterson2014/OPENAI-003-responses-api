'use client';

import { ReactNode } from 'react'
import FeskButton3 from '@/components/FeskButton3'
import FeskButtonDropdownGraph from '@/components/FeskButtonDropdownGraph'
import { TraceTreeItem, TraceTimeTreeItem } from '@/config/FeskConstants'
import FeskModal from '@/components/FeskModal'
import FeskDrawerGraph2 from '@/components/FeskDrawerGraph2'
import { useState } from 'react'

export default function FeskGraphNode2({ item, traceItem, traceList }: { item: TraceTimeTreeItem, traceItem: any, traceList: any[] }) {
    // const [content, setContent] = useState('no output yet')

    // export interface TraceTimeTreeItem {
    //     trace_id: string
    //     name: string
    //     start_time: number
    //     end_time: number
    //     parent_trace_id?: string
    //     children?: TraceTimeTreeItem[]
    // }

    const isRunnableSequence: boolean = item.name === 'RunnableSequence'
    const isRootCrewExecution: boolean = item.name === 'RootCrewExecution'
    const isChatOpenAI: boolean = item.name === 'ChatOpenAI'
    const isCrewAgentParser: boolean = item.name === 'CrewAgentParser'
    const isCrewAgentExecutor: boolean = item.name === 'CrewAgentExecutor'
    const isPromptTemplate: boolean = item.name === 'PromptTemplate'
    const isRunnableParallel: boolean = item.name === 'RunnableParallel<input,tools,tool_names,agent_scratchpad>'
    let isIntermediateSteps = false;
    let intermediateStepsString = 'none'
    let intermediate_steps: any[] = []
    let displayName = item.name

    if (isRunnableParallel) {
        try {

            intermediate_steps = traceItem.traceBody.inputs.intermediate_steps
            if (intermediate_steps.length > 0) {
                isIntermediateSteps = true;
                intermediateStepsString = JSON.stringify(intermediate_steps[intermediate_steps.length - 1], null, 2)
                displayName = 'run tool: ' + intermediate_steps[intermediate_steps.length - 1][0].tool
            } else {
                displayName = 'fetch input, tools and tool names'
            }
        } finally {

        }
    }

    let isError = false;
    let errorText = 'none'
    if (!isRootCrewExecution && traceItem && traceItem.traceBody && traceItem.traceBody.error) {
        errorText = traceItem.traceBody.error
        isError = true;
    }

    if (isCrewAgentParser) {
        if (isError) {
            displayName = 'error'
        } else {
            displayName = traceItem.traceBody.outputs.output.type + ': ' + traceItem.traceBody.outputs.output.tool
        }

    }

    if (isRunnableSequence) {
        displayName = 'execute sequence: '
    }

    if (isCrewAgentExecutor) {
        displayName = 'Agent begins working on a new Task'
    }

    const handleViewJson = async (trace_id: string, e?: any) => {
        e?.preventDefault()
        console.log('trace_id: ' + trace_id)
        // const textContent = JSON.stringify(traceItem.traceBody, null, 2)
        // alert(textContent);
        // const myDiv = document.getElementById('modal-content-' + trace_id);
        // alert(myDiv);
        // setContent(textContent)
        // myDiv.value = textContent;
        document.getElementById('modal-' + trace_id).showModal()
    }

    return (
        <>
            <div className='flex flex-row items-start'>

                <div className='flex-none'>
                    <div className='pl-[10px] pt-[5px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="m210.83 178.83l-48 48a4 4 0 0 1-5.66-5.66L198.34 180H64a4 4 0 0 1-4-4V32a4 4 0 0 1 8 0v140h130.34l-41.17-41.17a4 4 0 1 1 5.66-5.66l48 48a4 4 0 0 1 0 5.66Z" /></svg>
                    </div>
                </div>

                <div className='flex-1'>

                    <div className='flex flex-row m-[5px]' >


                        {isCrewAgentExecutor && (
                            <>
                                <FeskDrawerGraph2 displayName={displayName} isButton={true} >
                                    <div className='fesk-item'>

                                        <div className='pl-[10px]'>
                                            input: <br />
                                            {traceItem.traceBody.inputs.input} <br /><br />

                                            tool_names: <br />
                                            {traceItem.traceBody.inputs.tool_names} <br /><br />

                                            tools: <br />
                                            {traceItem.traceBody.inputs.tools} <br /><br />
                                        </div>

                                    </div>



                                </FeskDrawerGraph2>
                            </>

                        )}

                        {isChatOpenAI && (
                            <>
                                <FeskDrawerGraph2 displayName={displayName} isButton={true} >
                                    <div className='fesk-item'>
                                        <div>
                                            LLM output: <br />
                                            {traceItem.traceBody.outputs.generations[0].text} <br /><br />
                                        </div>
                                    </div>
                                </FeskDrawerGraph2>
                            </>
                        )}

                        {isRunnableSequence && (
                            <>
                                <FeskDrawerGraph2 displayName={displayName} isButton={false} >
                                    <></>
                                </FeskDrawerGraph2>
                            </>
                        )}

                        {isRunnableParallel && (
                            <>
                                <FeskDrawerGraph2 displayName={displayName} isButton={true} >
                                    <>
                                        {
                                            isIntermediateSteps && (
                                                <div>
                                                    {intermediate_steps[intermediate_steps.length - 1][1]}
                                                </div>
                                            )
                                        }
                                    </>
                                </FeskDrawerGraph2>
                            </>
                        )}

                        {isCrewAgentParser && (
                            <>
                                <FeskDrawerGraph2 displayName={displayName} isButton={true} >
                                    <div className='fesk-item'>
                                        <div>
                                            {!isError && (
                                                <div>
                                                    tool_input: <br />
                                                    {traceItem.traceBody.outputs.output.tool_input}

                                                </div>
                                            )}

                                            {isError && (
                                                <>

                                                    <div style={{ color: '#ffffff', backgroundColor: '#000000', padding: '10px', borderStyle: 'solid', borderColor: '#ed0f0f', borderWidth: '2px' }}>
                                                        {errorText} <br /><br />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </FeskDrawerGraph2>
                            </>
                        )}


                        <div className='flex-none'>
                            <div className='pl-[10px] pt-[5px]'>
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-xs bg-zinc-800 hover:bg-zinc-600 border border-zinc-600 text-zinc-200 hover:text-zinc-900 mt-[5px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffffff" d="M12 6a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z" /></svg>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content text-xs fesk-menu menu bg-zinc-800 z-1 w-50 mt-[5px] mb-[2px] ml-[2px] mr-[2px] shadow-sm">

                                        <li className='fesk-menu-li'><a onClick={() => handleViewJson(item.trace_id)}>view json</a></li>

                                    </ul>
                                </div>

                            </div>
                        </div>






                    </div>

                    {item.children?.map((child, i) => {
                        const foundItem = traceList.find(item => item.id === child.trace_id);
                        return (

                            <div key={`${item.trace_id}-child-${i}`} >

                                <FeskGraphNode2 item={child} traceItem={foundItem} traceList={traceList} />

                            </div>

                        )
                    })}

                </div>



            </div>





            <FeskModal id={`modal-${item.trace_id}`}>

                <label className='fesk-card-h2'>JSON Trace Object</label>
                <span>
                    <pre className='text-xs'>

                        {JSON.stringify(traceItem.traceBody, null, 2)}

                    </pre>
                </span>

            </FeskModal>

        </>
    );

}