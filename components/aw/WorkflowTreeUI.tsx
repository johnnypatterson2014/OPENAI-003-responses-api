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
import WorkflowTreeTaskUI from '@/components/aw/WorkflowTreeTaskUI'
import { workflowContext } from '@/components/aw/AgentWorkflowContext';


export default function WorkflowTreeUI() {
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

                {isContextLoaded && workflowTree.children && workflowTree.children.map((task, i) => {
                  return (
                    <div key={task.tree_task_id + '-' + i} className='mt-[8px] mb-[5px]'>
                      <WorkflowTreeTaskUI task={task} />

                    </div>

                  )

                })}



              </div>

            </div>

          </div>
        </div>
      </div>


    </>
  )
}
