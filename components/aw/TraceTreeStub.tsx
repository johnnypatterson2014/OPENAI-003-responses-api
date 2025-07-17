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
import { JsonData, AgentAction, TaskExecution, Workflow } from '@/components/aw/Constants';
import TaskExecutionComponent from '@/components/aw/TaskExecutionComponent'
import TaskExecutionComponentStub from '@/components/aw/TaskExecutionComponentStub'
import TaskExecutionComponentStub2 from '@/components/aw/TaskExecutionComponentStub2'
import { workflowContext } from '@/components/aw/AgentWorkflowContext';
import AgentActionComponentStub from '@/components/aw/AgentActionComponentStub'


export default function TraceTreeStub() {
  const { workflowExecution, isContextLoaded } = workflowContext()

  return (
    <>

      <div className="collapse">
        <input className='fesk-checkbox' id='collapse-checkbox-TraceTree' type="checkbox" />
        <div className="collapse-title">

          <div className="fesk-collapse-title-graph">
            <div className="p-[0px]">
              {isContextLoaded && (
                <Button2>
                  Multi-Agent execution trace
                </Button2>
              )}
            </div>

          </div>
        </div>

        <div className="collapse-content mt-[5px] mb-[50px]">
          <div className="pt-[5px] pr-[5px] pl-[5px] pb-[100px] m-[0px]">

            <div className="fesk-collapse-graph-content flex ">


              <div className="flex-1">

                <TaskExecutionComponentStub2 displayName='perform task' isButton={false}>

                  <TaskExecutionComponentStub displayName='agent: content marketing manager' isButton={true}>
                    <div key='key1' className='mb-[5px]' >
                      <AgentActionComponentStub name='POST /v1/responses' />
                    </div>

                    <div key='key2' className='mb-[8px]' >
                      <AgentActionComponentStub name='next action: transfer_to_online_researcher' />
                    </div>
                  </TaskExecutionComponentStub>


                  <TaskExecutionComponentStub displayName='agent: online researcher' isButton={true}>
                    <div key='key1' className='mb-[5px]' >
                      <AgentActionComponentStub name='action: web_search_call' />
                    </div>
                    <div key='key2' className='mb-[5px]' >
                      <AgentActionComponentStub name='POST /v1/responses' />
                    </div>
                  </TaskExecutionComponentStub>

                </TaskExecutionComponentStub2>





              </div>

            </div>

          </div>
        </div>
      </div>


    </>
  )
}
