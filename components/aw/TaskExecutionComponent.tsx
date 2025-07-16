'use client';

import { ReactNode } from 'react'
import TreeDrawer from '@/components/aw/TreeDrawer'
import AgentActionComponent from '@/components/aw/AgentActionComponent'
import ButtonDropdownGraph from '@/components/aw/ButtonDropdownGraph'
import { TraceTreeItem, TraceTimeTreeItem } from '@/config/FeskConstants'
import FeskModal from '@/components/FeskModal'
import FeskDrawerGraph2 from '@/components/FeskDrawerGraph2'
import { useState } from 'react'
import { JsonData, AgentAction, TaskExecution, Workflow, workflow_stub_data } from '@/components/aw/Constants';
import Button2 from '@/components/aw/Button2'
import { workflowContext } from '@/components/aw/AgentWorkflowContext';

export default function TaskExecutionComponent({ task }: { task: TaskExecution }) {
    const { workflow, setDisplayContent, openaiResponseList } = workflowContext()

    const handleViewJson = async (trace_id: string, e?: any) => {
        e?.preventDefault()
        console.log('trace_id: ' + trace_id)
        // const textContent = JSON.stringify(traceItem.traceBody, null, 2)
        // alert(textContent);
        // const myDiv = document.getElementById('modal-content-' + trace_id);
        // alert(myDiv);
        // setContent(textContent)
        // myDiv.value = textContent;
        // document.getElementById('modal-' + trace_id).showModal()
    }

    const displayTaskExecution = async (trace_id: string, e?: any) => {
        e?.preventDefault()
        console.log('trace_id: ' + trace_id)
        setDisplayContent(JSON.stringify(openaiResponseList[0].state.modelResponses[0].providerData.instructions, null, 2))


    }

    return (
        <>
            <div className='flex flex-row items-start'>

                <div className='flex-none'>
                    <div className='pl-[10px] pt-[5px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="m210.83 178.83l-48 48a4 4 0 0 1-5.66-5.66L198.34 180H64a4 4 0 0 1-4-4V32a4 4 0 0 1 8 0v140h130.34l-41.17-41.17a4 4 0 1 1 5.66-5.66l48 48a4 4 0 0 1 0 5.66Z" /></svg>
                    </div>
                </div>



                <div className='flex-1 tree-item'>

                    <div className='flex flex-row items-start m-[5px]' >

                        <div className='flex-1'>
                            <div className='flex flex-row'>
                                <div className='flex-1'>
                                    <TreeDrawer id={task.id} displayName={task.name} isButton={true} >
                                        {task.actions?.map((action, i) => {
                                            return (
                                                <div key={action.id} className='mt-[5px]' >
                                                    <AgentActionComponent action={action} />
                                                </div>
                                            )
                                        })}
                                    </TreeDrawer>
                                </div>



                            </div>
                        </div>

                        <div className='flex-none'>
                            <div className='icon-spacing'>
                                <ButtonDropdownGraph dropdownPosition='dropdown-left'>

                                    <ul id="promptTemplateDropdown" tabIndex={0} className="dropdown-content text-xs fesk-menu menu bg-zinc-800 z-1 w-50 mt-[2px] mb-[2px] ml-[2px] mr-[4px] shadow-sm">

                                        <li className='fesk-menu-li'><a onClick={() => handleViewJson(task.id)}>raw json</a></li>
                                        <li className='fesk-menu-li'><a onClick={() => handleViewJson(task.id)}>input json</a></li>
                                        <li className='fesk-menu-li'><a onClick={() => handleViewJson(task.id)}>task description</a></li>
                                        <li className='fesk-menu-li'><a onClick={() => handleViewJson(task.id)}>allowed tools</a></li>
                                        <li className='fesk-menu-li'><a onClick={() => handleViewJson(task.id)}>chain of thought</a></li>

                                    </ul>

                                </ButtonDropdownGraph>
                            </div>
                        </div>

                        <div className='flex-none icon-spacing2'>
                            <a onClick={() => displayTaskExecution(task.id)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Z" /><path d="m11 15l3-3l-3-3" /></g></svg></a>

                        </div>

                        {/* <div className='flex-none mt-[1px] ml-[5px]'>
                            <Button2>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M9.71 6.29a1 1 0 0 0-1.42 0l-5 5a1 1 0 0 0 0 1.42l5 5a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L5.41 12l4.3-4.29a1 1 0 0 0 0-1.42Zm11 5l-5-5a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 0-1.42Z" /></svg>
                            </Button2>
                        </div> */}



                    </div>

                </div>

            </div>

        </>
    );

}
