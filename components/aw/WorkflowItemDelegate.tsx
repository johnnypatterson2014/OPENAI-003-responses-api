'use client';

import { ReactNode, useEffect } from 'react'
import { WorkflowExecution, RefDataAgent, RefDataTools, WorkflowTreeNode, WorkflowTree, WorkflowTreeTask } from '@/components/aw/Constants';
import Button2 from '@/components/aw/Button2'
import FeskDrawerGraph2 from '@/components/FeskDrawerGraph2'
import { workflowContext } from '@/components/aw/AgentWorkflowContext';

export default function WorkflowItemDelegate({ node, taskId }: { node: WorkflowTreeNode, taskId: string }) {
    const { isContextLoaded, setTaskId, setTaskSelected } = workflowContext()

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
                            <div className='text-xs mt-[2px] mb-[2px]'>
                                {node.name}
                            </div>
                        </div>
                        <div className='flex-none text-xs ml-[5px]'>

                            <a onClick={() => setNewTaskId(taskId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path fill="none" stroke="#8ec5ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M262.62 336L342 256l-79.38-80m68.35 80H170" /><path fill="none" stroke="#8ec5ff" strokeMiterlimit="10" strokeWidth="32" d="M256 448c106 0 192-86 192-192S362 64 256 64S64 150 64 256s86 192 192 192Z" /></svg>
                            </a>

                        </div>

                    </div>

                    {isContextLoaded && node.children && node.children.map((myNode, i) => {
                        return (
                            <div key={myNode.id + '-' + i} className='mt-[8px] mb-[5px]'>
                                <WorkflowItemDelegate node={myNode} taskId={taskId} />

                            </div>

                        )

                    })}

                </div>

            </div>





        </>
    )

}