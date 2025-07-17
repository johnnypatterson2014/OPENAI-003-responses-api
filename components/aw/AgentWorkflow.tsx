'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import Button from '@/components/aw/Button';
import Button2 from '@/components/aw/Button2';
import TraceTree from '@/components/aw/TraceTree';
import TraceTreeStub from '@/components/aw/TraceTreeStub';
import MainContentDisplay from '@/components/aw/MainContentDisplay';
import { workflowContext } from '@/components/aw/AgentWorkflowContext';
import { AgentAction, TaskExecution, Workflow } from '@/components/aw/Constants';

const AgentWorkflow = () => {
  const { openaiResponseList, workflowExecution, isContextLoaded } = workflowContext()

  const getSavedTraces = async (e?: any) => {
    e?.preventDefault();
    // alert(openaiResponseList[0].state.currentTurn)

  }

  return (
    <>

      <div className='flex flex-row items-start mb-[15px] mt-[50px]'>

        <div className='flex-none ml-[15px] fesk-card'>

          <div className='grid grid-cols-1 gap-[10px]'>

            <div className='fesk-h2'>Agent Workflow</div>

            <div className='fesk-h2'>
              <Button>
                <a onClick={getSavedTraces}>get data from DB</a>
              </Button>
            </div>

            <div className='aw-mb'>
              <div className='fesk-item'>
                Trace for run using OpenAI agents: <br />
                trace_id: trace_dd431d0d43b3485397c032fe22b8bfab<br /><br />
              </div>

              {isContextLoaded && (
                <TraceTreeStub />
              )}

              <div className='fesk-item'>
                <br /><br /><br /><br />
                Trace for run using crewai agents: <br /><br />
                (coming soon)
                <pre>
                  trace_id list (in asc order)<br />
                  0fcb32ee-2074-4aba-ad29-004e3893188f<br />
                  5f6303fc-a3a3-4223-b80d-d7cad849a6c3<br />
                  1eceeaa6-c83d-4465-9b79-d93d34f1afe2<br />
                  a6e992be-cc76-42a8-a3ec-bfe7134ff65b<br />
                  a252aaef-e1c1-44e9-8fde-25f108212b2b<br />
                  2bd808c5-1ea5-4cdf-80e5-80dc81f24ada<br />
                  8552ffc7-cb1f-4b37-83cf-94f0688caec1<br />
                  ed5f65ab-d997-43ab-943e-70d5a65f723a<br />
                </pre>
              </div>


            </div>

          </div>

        </div>

        <div className='grow fesk-card ml-[15px] mr-[15px]'>

          <div className="m-[10px]">

            <div id='main_content'>

              <MainContentDisplay />

            </div>


          </div>
        </div>

      </div>

    </>
  )
}

export default AgentWorkflow;