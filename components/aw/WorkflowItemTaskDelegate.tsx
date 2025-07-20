'use client';

import { ReactNode, useEffect } from 'react'
import { WorkflowExecution, RefDataAgent, RefDataTools, RefDataTasks, WorkflowTree, WorkflowTreeTask } from '@/components/aw/Constants';
import Button2 from '@/components/aw/Button2'
import WorkflowItemDelegate from '@/components/aw/WorkflowItemDelegate'
import FeskDrawerGraph2 from '@/components/FeskDrawerGraph2'
import { workflowContext } from '@/components/aw/AgentWorkflowContext';

export default function WorkflowItemTaskDelegate({ node }: { node: WorkflowTreeTask }) {
    const { isContextLoaded, workflowExecution, setTaskId, setTaskSelected } = workflowContext()

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

                        <div className='flex-none fesk-item'>
                            <FeskDrawerGraph2 displayName={node.name} isButton={true} >

                                {isContextLoaded && node.children && node.children.map((myNode, i) => {
                                    return (
                                        <div key={myNode.id + '-' + i} className=''>
                                            <WorkflowItemDelegate node={myNode} taskId={node.tree_task_id} />

                                        </div>

                                    )

                                })}

                            </FeskDrawerGraph2>
                        </div>



                    </div>


                </div>

            </div>





        </>
    )

}