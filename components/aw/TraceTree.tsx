'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";
import { chatMessages } from '@/components/ChatMessageWrapper'
import Button2 from '@/components/aw/Button2'
import FeskGraphNode2 from '@/components/FeskGraphNode2'
import { TraceTreeItem, TraceTimeTreeItem } from '@/config/FeskConstants'
import FeskDrawer from '@/components/FeskDrawer';
import FeskDrawerGraph from '@/components/FeskDrawerGraph';
import FeskModal from '@/components/FeskModal'
import JsonResponseObject from '@/components/JsonResponseObject'
import { text } from 'stream/consumers';
import { useState } from 'react'
import { JsonData, AgentAction, TaskExecution, Workflow, workflow_stub_data } from '@/components/aw/Constants';
import TaskExecutionComponent from '@/components/aw/TaskExecutionComponent'

export default function TraceTree({ workflow, traceList }: { workflow: Workflow, traceList: JsonData[] }) {

  return (
    <>

      <div className="collapse">
        <input id='collapse-checkbox' type="checkbox" />
        <div className="collapse-title">

          <div className="fesk-collapse-title-graph">
            <div className="p-[0px]">
              <Button2>
                {workflow.name}
              </Button2>
            </div>

          </div>
        </div>

        <div className="collapse-content mt-[5px] mb-[50px]">
          <div className="pt-[5px] pr-[5px] pl-[5px] pb-[100px] m-[0px]">

            <div className="fesk-collapse-graph-content flex ">


              <div className="flex-1">

                {workflow.tasks?.map((task, i) => {

                  return (
                    <div key={task.id} className='mt-[8px] mb-[5px]'>
                      <TaskExecutionComponent task={task} />

                    </div>

                  )


                }
                )
                }

                <br /><br /><br />

                {/* {
                  rootNode && rootNode.children && (rootNode.children.length > 0) && (
                    <FeskGraphNode traceItem={rootNode.children[0]} traceList={traceList} />
                  )} */}



              </div>

            </div>

          </div>
        </div>
      </div>


    </>
  )
}