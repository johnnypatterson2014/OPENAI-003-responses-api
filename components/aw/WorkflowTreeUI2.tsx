'use client';

import { ReactNode, useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { chatMessages } from '@/components/ChatMessageWrapper'
import Button2 from '@/components/aw/Button2'
import { TraceTreeItem, TraceTimeTreeItem } from '@/config/FeskConstants'
import FeskDrawer from '@/components/FeskDrawer';
import FeskDrawerGraph from '@/components/FeskDrawerGraph';
import FeskModal from '@/components/FeskModal'
import JsonResponseObject from '@/components/JsonResponseObject'
import { text } from 'stream/consumers';
import { useState } from 'react'
import { WorkflowExecution, RefDataAgent, RefDataTools, RefDataTasks, WorkflowTree, WorkflowTreeTask } from '@/components/aw/Constants';
import WorkflowItemTask from '@/components/aw/WorkflowItemTask'
import { workflowContext } from '@/components/aw/AgentWorkflowContext';


export default function WorkflowTreeUI2() {
    const { workflowExecution, isContextLoaded, workflowTree } = workflowContext()

    useEffect(() => {

        const elements = document.querySelectorAll('.fesk-checkbox');
        elements.forEach(element => {
            element.checked = true;
        });


    }, []);



    return (
        <>

            <div className="collapse">
                <input className='fesk-checkbox' id='collapse-checkbox-TraceTree' type="checkbox" />
                <div className="collapse-title">

                    <div className="fesk-collapse-title-graph">
                        <div className="p-[0px]">
                            {isContextLoaded && (
                                <Button2>
                                    {workflowTree.name}
                                </Button2>
                            )}
                        </div>

                    </div>
                </div>

                <div className="collapse-content mt-[5px] mb-[50px]">
                    <div className="pt-[5px] pr-[5px] pl-[5px] pb-[100px] m-[0px]">

                        <div className="fesk-collapse-graph-content flex ">


                            <div className="flex-1">



                                <div className='mb-[2px]'>
                                    <div className='flex flex-row items-start'>

                                        <div className='flex-none'>
                                            <div className='pl-[10px] pt-[5px]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="m210.83 178.83l-48 48a4 4 0 0 1-5.66-5.66L198.34 180H64a4 4 0 0 1-4-4V32a4 4 0 0 1 8 0v140h130.34l-41.17-41.17a4 4 0 1 1 5.66-5.66l48 48a4 4 0 0 1 0 5.66Z" /></svg>
                                            </div>
                                        </div>

                                        <div className='flex-1'>

                                            <div className='flex flex-row m-[5px] items-start' >

                                                <div className='flex-none fesk-item'>
                                                    <div className='aw-execute-sequence'>execute sequence</div>



                                                    {isContextLoaded && workflowTree.children && workflowTree.children.map((task, i) => {
                                                        return (
                                                            <div key={task.tree_task_id + '-' + i}>
                                                                <WorkflowItemTask node={task} />

                                                            </div>

                                                        )

                                                    })}
                                                </div>

                                            </div>


                                        </div>

                                    </div>





                                </div>







                            </div>

                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}
