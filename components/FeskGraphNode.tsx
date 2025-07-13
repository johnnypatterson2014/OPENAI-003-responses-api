'use client';

import { ReactNode } from 'react'
import FeskButton3 from '@/components/FeskButton3'
import FeskButtonDropdownGraph from '@/components/FeskButtonDropdownGraph'
import { TraceTreeItem, TraceTimeTreeItem } from '@/config/FeskConstants'
import FeskModal from '@/components/FeskModal'
import FeskDrawerGraph from '@/components/FeskDrawerGraph'
import { useState } from 'react'

export default function FeskGraphNode({ item, traceItem, traceList }: { item: TraceTimeTreeItem, traceItem: any, traceList: any[] }) {
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

    if (isRunnableParallel) {
        try {
            intermediate_steps = traceItem.traceBody.inputs.intermediate_steps
            if (intermediate_steps.length > 0) {
                isIntermediateSteps = true;
                intermediateStepsString = JSON.stringify(intermediate_steps[intermediate_steps.length - 1], null, 2)
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

    if (isRunnableParallel) {
        return (
            <>
                <div className='flex flex-row items-start'>
                    <div className='flex-none p-[2px] mt-[4px]'>
                        action: run tool
                    </div>

                    <div className='flex-1 ml-[10px]'>
                        <div className="text-xs mb-[5px]">

                            <FeskDrawerGraph>

                                {isRunnableParallel && isIntermediateSteps && (
                                    <div>
                                        tool: <br />
                                        {intermediate_steps[intermediate_steps.length - 1][0].tool} <br /><br />

                                        tool input: <br />
                                        {intermediate_steps[intermediate_steps.length - 1][0].tool_input} <br /><br />

                                        tool output: <br />
                                        {intermediate_steps[intermediate_steps.length - 1][1]} <br /><br />

                                    </div>
                                )}
                            </FeskDrawerGraph>



                        </div>
                    </div>

                </div>
            </>
        )
    }
    else if (isCrewAgentParser) {
        return (
            <>
                <div className='flex flex-row items-start'>
                    <div className='flex-none p-[2px] mt-[4px]'>
                        next step:&nbsp;
                        {!isError && (
                            <>
                                {traceItem.traceBody.outputs.output.type}
                            </>
                        )}

                    </div>

                    <div className='flex-1 ml-[10px]'>
                        <div className="text-xs mb-[5px]">

                            <FeskDrawerGraph>

                                {!isError && (
                                    <div>
                                        use tool: {traceItem.traceBody.outputs.output.tool}<br /><br />

                                        tool_input: <br />
                                        {traceItem.traceBody.outputs.output.tool_input} <br /><br />

                                    </div>
                                )}

                                {isError && (
                                    <div>
                                        {errorText}

                                    </div>
                                )}


                            </FeskDrawerGraph>



                        </div>
                    </div>

                </div>
            </>
        )
    }
    else if (isRunnableSequence) {
        return (
            <>
                <div className='flex flex-row items-start'>
                    <div className='flex-none p-[2px] mt-[4px]'>
                        execute sequence:
                    </div>

                </div>

                {item.children?.map((child, i) => {
                    const foundItem = traceList.find(item => item.id === child.trace_id);
                    return (

                        <div key={`${item.trace_id}-child-${i}`} >
                            <div className='mb-[5px] mt-[5px]'>
                                <div className='flex flex-row'>
                                    <div className='flex-none pl-[10px] pt-[5px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="m210.83 178.83l-48 48a4 4 0 0 1-5.66-5.66L198.34 180H64a4 4 0 0 1-4-4V32a4 4 0 0 1 8 0v140h130.34l-41.17-41.17a4 4 0 1 1 5.66-5.66l48 48a4 4 0 0 1 0 5.66Z" /></svg>
                                    </div>

                                    <div className='m-[5px] fesk-item' >

                                        <FeskGraphNode item={child} traceItem={foundItem} traceList={traceList} />

                                    </div>
                                </div>
                            </div>

                        </div>

                    )
                }
                )
                }
            </>
        )
    }
    else

        return (
            <>
                <div className='flex flex-row items-start'>

                    <div className='flex-none'>
                        <FeskButtonDropdownGraph name={item.name} dropdownPosition='dropdown-right'>

                            <ul id="promptTemplateDropdown" tabIndex={0} className="dropdown-content text-xs fesk-menu menu bg-zinc-800 z-1 w-50 mt-[2px] mb-[2px] ml-[5px] mr-[2px] shadow-sm">

                                <li className='fesk-menu-li'><a onClick={() => handleViewJson(item.trace_id)}>view json</a></li>

                            </ul>

                        </FeskButtonDropdownGraph>
                    </div>

                    <div className='flex-1 ml-[10px]'>
                        <div className="text-xs mb-[5px]">

                            <FeskDrawerGraph >
                                {isCrewAgentExecutor && (
                                    <div>
                                        input: <br />
                                        {traceItem.traceBody.inputs.input} <br /><br />

                                        tool_names: <br />
                                        {traceItem.traceBody.inputs.tool_names} <br /><br />

                                        tools: <br />
                                        {traceItem.traceBody.inputs.tools} <br /><br />
                                    </div>
                                )}
                                {isPromptTemplate && (
                                    <div>
                                        generated prompt: <br />
                                        {traceItem.traceBody.outputs.output.text} <br /><br />
                                    </div>
                                )}

                                {isChatOpenAI && (
                                    <div>
                                        LLM output: <br />
                                        {traceItem.traceBody.outputs.generations[0].text} <br /><br />
                                    </div>
                                )}

                                {isCrewAgentParser && !isError && (
                                    <div>
                                        next step: {traceItem.traceBody.outputs.output.type}<br /><br />

                                        use tool: {traceItem.traceBody.outputs.output.tool}<br /><br />

                                        tool_input: <br />
                                        {traceItem.traceBody.outputs.output.tool_input} <br /><br />

                                    </div>
                                )}

                                {isRunnableParallel && isIntermediateSteps && (
                                    <div>
                                        tool: <br />
                                        {intermediate_steps[intermediate_steps.length - 1][0].tool} <br /><br />

                                        tool input: <br />
                                        {intermediate_steps[intermediate_steps.length - 1][0].tool_input} <br /><br />

                                        tool output: <br />
                                        {intermediate_steps[intermediate_steps.length - 1][1]} <br /><br />

                                    </div>
                                )}
                            </FeskDrawerGraph>



                        </div>
                    </div>

                </div>

                {item.children?.map((child, i) => {
                    const foundItem = traceList.find(item => item.id === child.trace_id);
                    return (

                        <div key={`${item.trace_id}-child-${i}`} >
                            <div className='mb-[5px] mt-[5px]'>
                                <div className='flex flex-row'>
                                    <div className='flex-none pl-[10px] pt-[5px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="m210.83 178.83l-48 48a4 4 0 0 1-5.66-5.66L198.34 180H64a4 4 0 0 1-4-4V32a4 4 0 0 1 8 0v140h130.34l-41.17-41.17a4 4 0 1 1 5.66-5.66l48 48a4 4 0 0 1 0 5.66Z" /></svg>
                                    </div>

                                    <div className='m-[5px] fesk-item' >

                                        <FeskGraphNode item={child} traceItem={foundItem} traceList={traceList} />

                                    </div>
                                </div>
                            </div>

                        </div>

                    )
                }
                )
                }

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