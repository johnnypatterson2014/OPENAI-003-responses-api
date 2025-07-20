'use client';


import Button2 from '@/components/aw/Button2'
import Drawer from '@/components/aw/Drawer'
import { workflowContext } from '@/components/aw/AgentWorkflowContext';
import { useState, useEffect } from 'react'
import FeskButton3 from '@/components/FeskButton3'
import FeskDrawerGraph2 from '@/components/FeskDrawerGraph2'
import { WorkflowExecution, WorkflowSubTask, RefDataAgent, RefDataTools, RefDataTasks, WorkflowTask, WorkflowTree, WorkflowTreeNode, WorkflowTreeTask } from '@/components/aw/Constants';

export default function WorkflowTreeUI2() {
    const { isContextLoaded, workflowTree } = workflowContext()

    return (
        <>
            <div className="collapse">
                <input id='collapse-checkbox' type="checkbox" />
                <div className="collapse-title">

                    <div className="fesk-collapse-title-graph">
                        <div className="p-[0px] pb-[5px]">
                            <FeskButton3>
                                Agent workflow 2
                            </FeskButton3>
                        </div>

                    </div>
                </div>

                <div className="collapse-content mt-[5px] mb-[50px]">
                    <div className="pt-[5px] pr-[5px] pl-[5px] pb-[50px] m-[0px]">

                        <div className="fesk-collapse-graph-content flex ">


                            <div className="flex-1 pt-[5px]">

                                {/* for each child task */}
                                <div key='123'>

                                    {/* start FeskGraphNode2 ***********************************/}
                                    {/* <FeskGraphNode2 item={child} traceItem={foundItem} traceList={traceList} /> */}

                                    <div className='flex flex-row items-start'>

                                        <div className='flex-none'>
                                            <div className='pl-[10px] pt-[5px]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="m210.83 178.83l-48 48a4 4 0 0 1-5.66-5.66L198.34 180H64a4 4 0 0 1-4-4V32a4 4 0 0 1 8 0v140h130.34l-41.17-41.17a4 4 0 1 1 5.66-5.66l48 48a4 4 0 0 1 0 5.66Z" /></svg>
                                            </div>
                                        </div>

                                        <div className='flex-1'>

                                            <div className='flex flex-row m-[5px]' >




                                                <div className='fesk-item'>
                                                    <FeskDrawerGraph2 displayName='my task' isButton={true} >
                                                        <div className='fesk-item'>

                                                            <div className='pl-[10px]'>
                                                                input: <br />
                                                                traceItem.traceBody.inputs.input <br /><br />

                                                                tool_names: <br />
                                                                traceItem.traceBody.inputs.tool_names <br /><br />

                                                                tools: <br />
                                                                traceItem.traceBody.inputs.tools <br /><br />
                                                            </div>

                                                        </div>
                                                    </FeskDrawerGraph2>
                                                </div>



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

                                            {/* for each child task */}

                                            <div key='1234-child-1234' >

                                                each child goes here. Recursive call to FeskGraphNode2

                                                {/* <FeskGraphNode2 item={child} traceItem={foundItem} traceList={traceList} /> */}

                                            </div>

                                        </div>



                                    </div>

                                    {/* end FeskGraphNode2 ***************************************/}
                                </div>


                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    );

}