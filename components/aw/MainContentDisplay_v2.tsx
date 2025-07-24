'use client';


import Button2 from '@/components/aw/Button2'
import Drawer from '@/components/aw/Drawer'
import Drawer2 from '@/components/aw/Drawer2'
import RoleTurn from '@/components/aw/RoleTurn'
import RoleTurnNoHeading from '@/components/aw/RoleTurnNoHeading'
import { workflowContext_v2 } from '@/components/aw/AgentWorkflowContext_v2';
import { useState, useEffect } from 'react'
import { WorkflowExecution, WorkflowSubTask, RefDataAgent, RefDataTools, RefDataTasks, WorkflowTask, WorkflowTree, WorkflowTreeNode, WorkflowTreeTask } from '@/components/aw/Constants';

export default function MainContentDisplay_v2() {
    const { isContextLoaded, workflowData, selectedTreeNode, workflowTreeData } = workflowContext_v2()
    // const [treeNode, setCurrentTask] = useState<WorkflowTask>()

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


    return (
        <>

            {selectedTreeNode && isContextLoaded && (
                <>

                    <div className='flex flex-row'>

                        <div className='flex-1'>

                            {
                                selectedTreeNode.systemInstructions && (
                                    <Drawer2 name='instructions'>
                                        <div className='grid col-auto'>

                                            <RoleTurnNoHeading>
                                                <div className='aw-main-h3'>system instructions:</div>
                                                <div className='aw-margin-left-15'>
                                                    <div className='dangerouslySetInnerHTML'>
                                                        <div dangerouslySetInnerHTML={{ __html: selectedTreeNode.systemInstructions }} className='grow text-blue-300'></div>
                                                    </div>
                                                </div>
                                            </RoleTurnNoHeading>

                                        </div>
                                    </Drawer2>
                                )
                            }




                            {
                                selectedTreeNode.input && selectedTreeNode.input.length > 0 && (
                                    <Drawer2 name='input'>
                                        <div className='grid col-auto'>
                                            <RoleTurnNoHeading>
                                                {selectedTreeNode.input && selectedTreeNode.input.map((item: any, i: any) => {
                                                    return (
                                                        <div key={item + '-' + i}>

                                                            <div className='aw-main-h3'>{item.role}: {item.type}</div>
                                                            <div className='aw-margin-left-15'>
                                                                <div className='dangerouslySetInnerHTML'>
                                                                    <div dangerouslySetInnerHTML={{ __html: item.content }} className='grow text-blue-300'></div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )

                                                })}

                                            </RoleTurnNoHeading>

                                        </div>
                                    </Drawer2>
                                )
                            }

                            {
                                selectedTreeNode.output && (
                                    <Drawer2 name='result'>
                                        <div className='grid col-auto'>
                                            <RoleTurnNoHeading>

                                                <div className='aw-main-h3'>{selectedTreeNode.output.role}: {selectedTreeNode.output.type}</div>
                                                <div className='aw-margin-left-15'>
                                                    <div className='dangerouslySetInnerHTML'>
                                                        <div dangerouslySetInnerHTML={{ __html: selectedTreeNode.output.content }} className='grow text-blue-300'></div>
                                                    </div>
                                                </div>

                                            </RoleTurnNoHeading>

                                        </div>
                                    </Drawer2>
                                )
                            }

                        </div>

                    </div>

                </>
            )}

        </>
    );

}