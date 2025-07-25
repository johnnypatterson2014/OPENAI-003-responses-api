'use client';

import { ReactNode, useEffect } from 'react'
import { WorkflowExecution, RefDataAgent, RefDataTools, RefDataTasks, WorkflowTree, WorkflowTreeTask } from '@/components/aw/Constants';
import Button2 from '@/components/aw/Button2'
import Button3 from '@/components/aw/Button3'
import WorkflowItem from '@/components/aw/WorkflowItem'
import FeskDrawerGraph2 from '@/components/FeskDrawerGraph2'
import WorkflowItemTaskDelegate from '@/components/aw/WorkflowItemTaskDelegate'
import { workflowContext2 } from '@/components/aw/AgentWorkflowContext2';

export default function WorkflowItemTask({ node }: { node: WorkflowTreeTask }) {
    const { isContextLoaded, workflowExecution, setTaskId, setTaskSelected } = workflowContext2()

    useEffect(() => {
        const elements = document.querySelectorAll('.fesk-checkbox');
        elements.forEach(element => {
            element.checked = true;
        });
    }, []);

    const setNewTaskId = async (id: string, e?: any) => {
        e?.preventDefault()
        setTaskId(id)
        setTaskSelected(true)
        toggleAll(true)
    }

    const toggleAll = (value: boolean) => {
        const elements = document.querySelectorAll('.aw-collapse-checkbox');
        elements.forEach(element => {
            // console.log(element.textContent);
            element.checked = value;
        });
    }

    return (
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
                            <Button2>
                                <a onClick={() => setNewTaskId(node.tree_task_id)}>
                                    <div className='flex flex-row items-center'>
                                        <div className='flex-none aw-margin-right-5'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>
                                        </div>
                                        <div className='flex-none aw-margin-bottom-2'>
                                            {node.name}
                                        </div>

                                    </div>
                                </a>
                            </Button2>


                            {isContextLoaded && node.children && node.children.map((myNode, i) => {
                                return (
                                    <div key={myNode.id + '-' + i} className=''>
                                        <WorkflowItem node={myNode} taskId={node.tree_task_id} />

                                    </div>

                                )

                            })}
                            {
                                node.delegate_task && (
                                    <WorkflowItemTask node={node.delegate_task} />
                                )
                            }

                        </div>

                        <div className='flex-none'>
                            <div className='pl-[10px] pt-[5px]'>

                                {/* <Button2>
                                    <a onClick={() => setNewTaskId(node.tree_task_id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>
                                    </a>
                                </Button2> */}

                                {/* <a onClick={() => setNewTaskId(node.tree_task_id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path fill="none" stroke="#8ec5ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M262.62 336L342 256l-79.38-80m68.35 80H170" /><path fill="none" stroke="#8ec5ff" stroke-miterlimit="10" stroke-width="32" d="M256 448c106 0 192-86 192-192S362 64 256 64S64 150 64 256s86 192 192 192Z" /></svg>
                                </a> */}

                            </div>
                        </div>

                    </div>


                </div>

            </div>





        </div>
    )

}