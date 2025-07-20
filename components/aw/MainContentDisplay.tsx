'use client';


import Button2 from '@/components/aw/Button2'
import Drawer from '@/components/aw/Drawer'
import RoleTurn from '@/components/aw/RoleTurn'
import { workflowContext } from '@/components/aw/AgentWorkflowContext';
import { useState, useEffect } from 'react'
import { WorkflowExecution, WorkflowSubTask, RefDataAgent, RefDataTools, RefDataTasks, WorkflowTask, WorkflowTree, WorkflowTreeNode, WorkflowTreeTask } from '@/components/aw/Constants';

export default function MainContentDisplay() {
    const { isContextLoaded, isWorkflowSelected, workflowExecution, taskId, isTaskSelected } = workflowContext()
    // const [currentTask, setCurrentTask] = useState<WorkflowTask>()

    // useEffect(() => {
    //     // This code runs after `myState` has been updated
    //     console.log("State updated:", taskId);
    //     setCurrentTask(taskList.find(item => item.id == taskId))
    // }, [taskId]);

    const toggleAll = (value: boolean) => {
        const elements = document.querySelectorAll('.aw-collapse-checkbox');
        elements.forEach(element => {
            // console.log(element.textContent);
            element.checked = value;
        });
    }

    let currentTask: any = null
    if (isTaskSelected) {
        currentTask = workflowExecution.task_run_list.find(item => item.task_id == taskId)

        if (!currentTask) {
            for (let i = 0; i < workflowExecution.task_run_list.length; i++) {
                if (workflowExecution.task_run_list[i].delegate_task) {
                    if (workflowExecution.task_run_list[i].delegate_task?.task_id == taskId) {
                        currentTask = workflowExecution.task_run_list[i].delegate_task
                    }
                }
            }
        }
    }

    return (
        <>
            {isWorkflowSelected && (
                <>
                    <div className='flex flex-row'>

                        <div className='flex-none'>
                            <Button2>
                                view agent definitions
                            </Button2>
                        </div>

                        <div className='flex-none ml-[10px]'>
                            <Button2>
                                view task definitions
                            </Button2>
                        </div>

                        <div className='flex-none ml-[10px]'>
                            <Button2>
                                view tool definitions
                            </Button2>
                        </div>

                        <div className='flex-none ml-[10px]'>
                            <Button2>
                                <a onClick={() => toggleAll(true)}>expand all</a>
                            </Button2>
                        </div>

                        <div className='flex-none ml-[10px]'>
                            <Button2>
                                <a onClick={() => toggleAll(false)}>collapse all</a>
                            </Button2>
                        </div>

                    </div>
                </>
            )}

            {isWorkflowSelected && isContextLoaded && isTaskSelected && (
                <>
                    <div className='flex flex-row aw-margin-top-15'>
                        <div className='flex-1'>

                            <div className='aw-margin-bottom'>
                                <span className='fesk-h2 text-blue-300'>
                                    {workflowExecution.workflow_name}:
                                </span>
                                <span className='ml-[10px] text-blue-300'>
                                    {currentTask.agentName}
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className='flex flex-row'>

                        <div className='flex-1'>

                            {/* <Drawer name='testing'>
                                <div className='grid col-auto'>

                                    <RoleTurn roleName='User'>
                                        <div className='dangerouslySetInnerHTML'>
                                            <div dangerouslySetInnerHTML={{ __html: workflowExecution.overallTaskDescription }} className='grow ml-4 text-blue-300'></div>
                                        </div>
                                    </RoleTurn>

                                    <RoleTurn roleName='assisstant'>
                                        <div className='dangerouslySetInnerHTML'>
                                            <div dangerouslySetInnerHTML={{ __html: currentTask.instructions }} className='grow ml-4 text-blue-300'></div>
                                        </div>
                                    </RoleTurn>

                                </div>
                            </Drawer> */}




                            {/* <Drawer name='overall task description'>
                                <div className='grid col-auto'>
                                    <div className='w-full max-w-9/10 aw-property aw-overflow-wrap'>

                                        <div className='dangerouslySetInnerHTML'>
                                            <div dangerouslySetInnerHTML={{ __html: workflowExecution.overallTaskDescription }} className='grow ml-4 text-blue-300'></div>
                                        </div>

                                    </div>

                                </div>
                            </Drawer> */}

                            <Drawer name='original input'>
                                <div className='grid col-auto'>

                                    <RoleTurn roleName={workflowExecution.assignedAgent}>
                                        <div className='dangerouslySetInnerHTML'>
                                            <div dangerouslySetInnerHTML={{ __html: workflowExecution.overallTaskDescription }} className=' grow ml-4 text-blue-300'></div>
                                        </div>
                                    </RoleTurn>

                                </div>
                            </Drawer>

                            <Drawer name='instructions'>
                                <div className='grid col-auto'>

                                    <RoleTurn roleName='system instructions'>
                                        <div className='dangerouslySetInnerHTML'>
                                            <div dangerouslySetInnerHTML={{ __html: currentTask.instructions }} className='grow ml-4 text-blue-300'></div>
                                        </div>
                                    </RoleTurn>

                                </div>
                            </Drawer>

                            <Drawer name='input'>
                                <div className='grid col-auto'>

                                    <RoleTurn roleName={currentTask.sub_task_list[0].role}>
                                        <div className='dangerouslySetInnerHTML'>
                                            <div dangerouslySetInnerHTML={{ __html: currentTask.sub_task_list[0].subTaskDescription }} className=' grow ml-4 text-blue-300'></div>
                                        </div>
                                    </RoleTurn>

                                </div>
                            </Drawer>

                            <Drawer name='result'>
                                <div className='grid col-auto'>

                                    <RoleTurn roleName={currentTask.sub_task_list[0].subType}>
                                        <div className='dangerouslySetInnerHTML'>
                                            <div dangerouslySetInnerHTML={{ __html: currentTask.sub_task_list[0].output }} className=' grow ml-4 text-blue-300'></div>
                                        </div>
                                    </RoleTurn>

                                </div>
                            </Drawer>

                        </div>

                    </div>

                </>
            )}

        </>
    );

}