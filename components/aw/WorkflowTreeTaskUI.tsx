'use client';

import { ReactNode, useEffect } from 'react'
import TreeDrawer from '@/components/aw/TreeDrawer'
import WorkflowTreeNodeUIWithChildren from '@/components/aw/WorkflowTreeNodeUIWithChildren'
import { TraceTreeItem, TraceTimeTreeItem, SVG_ICON_REQ } from '@/config/FeskConstants'
import FeskModal from '@/components/FeskModal'
import WorkflowTreeNodeUI from '@/components/aw/WorkflowTreeNodeUI'
import { useState } from 'react'
import { WorkflowTreeTask } from '@/components/aw/Constants';
import Button2 from '@/components/aw/Button2'
import { workflowContext } from '@/components/aw/AgentWorkflowContext';

export default function WorkflowTreeTaskUI({ task }: { task: WorkflowTreeTask }) {
    const { workflowExecution, setTaskId, setTaskSelected } = workflowContext()

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
            <div className='flex flex-row items-start aw-tree-item-mt'>

                <div className='flex-none'>
                    <div className='pl-[10px] pt-[5px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="m210.83 178.83l-48 48a4 4 0 0 1-5.66-5.66L198.34 180H64a4 4 0 0 1-4-4V32a4 4 0 0 1 8 0v140h130.34l-41.17-41.17a4 4 0 1 1 5.66-5.66l48 48a4 4 0 0 1 0 5.66Z" /></svg>
                    </div>
                </div>

                <div className='flex-1'>

                    <div className='flex flex-row items-start m-[5px]' >

                        <div className='flex-1'>
                            <div className='flex flex-row'>
                                <div className='flex-1'>

                                    <TreeDrawer id={task.tree_task_id} displayName={task.name} isButton={true} >

                                        {task.children && task.children.map((node, i) => {
                                            let hasChildren = false
                                            if (node.children && node.children.length > 0) {
                                                hasChildren = true
                                            }
                                            return (
                                                <div key={task.tree_task_id + '-' + node.id} className='mt-[8px] mb-[5px]'>
                                                    {hasChildren && (
                                                        <WorkflowTreeNodeUIWithChildren currentNode={node} />
                                                    )}

                                                    {!hasChildren && (
                                                        <WorkflowTreeNodeUI node={node} />
                                                    )}

                                                </div>
                                            )
                                        })}

                                        {task.delegate_task && (
                                            <WorkflowTreeTaskUI task={task.delegate_task} />
                                        )}

                                    </TreeDrawer>
                                </div>

                            </div>
                        </div>


                        <div className='flex-none icon-spacing2'>

                            <Button2>
                                <a onClick={() => setNewTaskId(task.tree_task_id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M9.71 6.29a1 1 0 0 0-1.42 0l-5 5a1 1 0 0 0 0 1.42l5 5a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L5.41 12l4.3-4.29a1 1 0 0 0 0-1.42Zm11 5l-5-5a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 0-1.42Z" /></svg>
                                </a>
                            </Button2>

                        </div>


                    </div>

                </div>

            </div>

        </>
    );

}
