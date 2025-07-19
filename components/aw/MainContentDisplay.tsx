'use client';


import Button2 from '@/components/aw/Button2'
import Drawer from '@/components/aw/Drawer'
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


                            <Drawer name='system instructions'>
                                <div className='grid col-auto'>
                                    <div className='aw-property'>

                                        <div className='dangerouslySetInnerHTML'>
                                            <div dangerouslySetInnerHTML={{ __html: currentTask.instructions }} className='grow ml-4 text-blue-300'></div>
                                        </div>

                                    </div>

                                </div>
                            </Drawer>

                            <Drawer name='input'>
                                <div className='grid col-auto'>
                                    <div className='aw-property'>

                                        <div className='fesk-h2'>{currentTask.sub_task_list[0].role}:</div>
                                        <div className='dangerouslySetInnerHTML'>

                                            <div dangerouslySetInnerHTML={{ __html: currentTask.sub_task_list[0].subTaskDescription }} className='aw-overflow-wrap grow ml-4 text-blue-300'></div>
                                        </div>

                                    </div>

                                </div>
                            </Drawer>

                            <Drawer name='result'>
                                <div className='grid col-1'>
                                    <div className='aw-property'>

                                        <div className='ml-4 text-blue-300'>
                                            action: {currentTask.sub_task_list[0].type} <br />
                                            role: {currentTask.sub_task_list[0].role} <br />
                                            name: {currentTask.sub_task_list[0].name} <br />
                                            instructions: {currentTask.sub_task_list[0].instructions} <br />
                                            task description: {currentTask.sub_task_list[0].subTaskDescription} <br />
                                            {
                                                currentTask.sub_task_list[0].queryType && (
                                                    <>
                                                        {currentTask.sub_task_list[0].queryType}: {currentTask.sub_task_list[0].query} <br />
                                                    </>
                                                )
                                            }
                                            sourceAgent: {currentTask.sub_task_list[0].sourceAgent} <br />
                                            targetAgent: {currentTask.sub_task_list[0].targetAgent} <br />

                                            output: <br />
                                            {currentTask.sub_task_list[0].output}



                                        </div>

                                    </div>

                                </div>
                            </Drawer>

                        </div>

                    </div>

                </>
            )}

        </>
    );

}