'use client';

import { ReactNode, useEffect } from 'react'
import { WorkflowTreeNode } from '@/components/aw/Constants';
import Button2 from '@/components/aw/Button2'
import Drawer_v2 from '@/components/aw/Drawer_v2'
import RoleTurnNoHeading_v2 from '@/components/aw/RoleTurnNoHeading_v2'
import MainContentDisplay_v2 from '@/components/aw/MainContentDisplay_v2'
import FeskDrawerGraph2 from '@/components/FeskDrawerGraph2'
import WorkflowItemTaskDelegate from '@/components/aw/WorkflowItemTaskDelegate'
import { workflowContext_v2 } from '@/components/aw/AgentWorkflowContext_v2';
import FeskButtonDropdown from '@/components/FeskButtonDropdown';
import FeskModal from '@/components/FeskModal'


export default function WorkflowTreeNode_v2({ node }: { node: WorkflowTreeNode }) {
    const { openaiResponses, workflowData, isContextLoaded } = workflowContext_v2()

    const setNewTaskId = async (id: string, e?: any) => {
        e?.preventDefault()
        // setTaskId(id)
        // setTaskSelected(true)

    }

    const updateInputForDropdown = (id: string, value: string) => {
        const myDiv = document.getElementById(id);
        myDiv.value = value;
        document.activeElement.blur();
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

                        <div className='flex-1 fesk-item'>

                            <Drawer_v2 name={node.name}>
                                <div className='grid grid-cols-1'>

                                    {
                                        node.input && node.input.length > 0 && (
                                            <RoleTurnNoHeading_v2 id={node.id}>
                                                {
                                                    node.input && node.input.length > 0 && node.input.map((myNode, i) => {
                                                        return (
                                                            <div key={node.id + '-input-' + i}>

                                                                <div className='aw-main-h3'>{myNode.role}: {myNode.type}</div>
                                                                <div className='aw-margin-left-15'>
                                                                    <div className='dangerouslySetInnerHTML'>
                                                                        <div dangerouslySetInnerHTML={{ __html: myNode.content }} className='grow text-blue-300'></div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )

                                                    })
                                                }
                                            </RoleTurnNoHeading_v2>
                                        )
                                    }



                                    {
                                        node.output && (
                                            <RoleTurnNoHeading_v2 id={node.id}>
                                                <div className='aw-main-h3'>{node.output.role}: {node.output.type}</div>
                                                <div className='aw-margin-left-15'>
                                                    <div className='dangerouslySetInnerHTML'>
                                                        <div dangerouslySetInnerHTML={{ __html: node.output.content }} className='grow text-blue-300'></div>
                                                    </div>
                                                </div>
                                            </RoleTurnNoHeading_v2>
                                        )
                                    }
                                </div>
                            </Drawer_v2>

                            {node.children && node.children.map((myNode, i) => {

                                return (
                                    <div key={myNode.id + '-children-' + i} className=''>
                                        <WorkflowTreeNode_v2 node={myNode} />
                                    </div>

                                )

                            })}

                        </div>


                    </div>


                </div>

            </div>

            <FeskModal id="modal_json_response">
                <span>
                    <pre id='json_response' className='text-xs'></pre>
                </span>
            </FeskModal>

            <FeskModal id="modal_full_details">
                <MainContentDisplay_v2 />
            </FeskModal>





        </div>
    )

}