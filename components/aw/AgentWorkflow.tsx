'use client';

import { useState, useEffect } from 'react'
import WorkflowTreeUI from '@/components/aw/WorkflowTreeUI';
import MainContentDisplay from '@/components/aw/MainContentDisplay';
import WorkflowTreeUI2 from '@/components/aw/WorkflowTreeUI2';
import { workflowContext } from '@/components/aw/AgentWorkflowContext';

const AgentWorkflow = () => {
  const { openaiResponseList, workflowExecution, isContextLoaded } = workflowContext()

  useEffect(() => {

    const elements = document.querySelectorAll('.fesk-checkbox');
    elements.forEach(element => {
      element.checked = true;
    });


  }, []);

  return (
    <>

      <div className='flex flex-row items-start mb-[15px] mt-[50px]'>

        <div className='flex-none ml-[15px] fesk-card'>

          <div className='grid grid-cols-1 gap-[10px]'>

            <div className='fesk-h2'>Agent Workflow</div>

            <WorkflowTreeUI />

            {/* <WorkflowTreeUI2 /> */}



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