'use client';

import Button from '@/components/aw/Button';
import Button2 from '@/components/aw/Button2';
import TraceTree from '@/components/aw/TraceTree';
import { AgentAction, TaskExecution, Workflow, workflow_stub_data } from '@/components/aw/Constants';

const AgentWorkflow = () => {

  const getSavedTraces = async (e?: any) => {
    e?.preventDefault();

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
              <TraceTree workflow={workflow_stub_data} traceList={[]} />


            </div>

          </div>

        </div>

        <div className='grow fesk-card ml-[15px] mr-[15px]'>
          <div className='fesk-h2'>Agent Workflow Details</div>
          <div className="m-[10px]">





          </div>
        </div>

      </div>

    </>
  )
}

export default AgentWorkflow
