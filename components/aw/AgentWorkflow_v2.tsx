'use client';


import { useState, useEffect } from 'react'
import WorkflowTreeUI from '@/components/aw/WorkflowTreeUI';
import Button2 from '@/components/aw/Button2';
import MainContentDisplay from '@/components/aw/MainContentDisplay';
import WorkflowTreeNode_v2 from '@/components/aw/WorkflowTreeNode_v2';
import { workflowContext_v2 } from '@/components/aw/AgentWorkflowContext_v2';
import { WorkflowExecution, WorkflowTask, WorkflowTreeRoot, WorkflowTreeNode, TreeNodeMessage } from '@/components/aw/Constants';
import { v7 } from 'uuid';

export default function AgentWorkflow_v2({ subNodeName }: { subNodeName: string }) {
  const { openaiResponses, workflowData, isContextLoaded } = workflowContext_v2()

  // useEffect(() => {
  //         const elements = document.querySelectorAll('.fesk-checkbox');
  //         elements.forEach(element => {
  //             element.checked = true;
  //         });
  //     }, []);

  return (
    <>

      <div className="collapse aw-main-content">
        <input className='fesk-checkbox' id='collapse-checkbox-TraceTree' type="checkbox" />
        <div className="collapse-title">

          <div className="fesk-collapse-title-graph">
            <div className="p-[0px]">
              {isContextLoaded && (
                <Button2>
                  {workflowData.name}
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
                        <div className='flex-1 fesk-item'>
                          <div className='aw-execute-sequence'>{subNodeName}</div>

                          {isContextLoaded && workflowData.children && workflowData.children.map((node, i) => {
                            return (
                              <div key={node.id + '-' + i}>
                                <WorkflowTreeNode_v2 node={node} />
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
