'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";
import { chatMessages } from '@/components/ChatMessageWrapper'
import FeskButton3 from '@/components/FeskButton3'
import { TraceTreeItem, TraceTimeTreeItem } from '@/config/FeskConstants'
import FeskDrawer from '@/components/FeskDrawer';
import FeskModal from '@/components/FeskModal'
import JsonResponseObject from '@/components/JsonResponseObject'
import { text } from 'stream/consumers';
import { useState } from 'react'

export default function TraceTreeItemComponent({ item, traceItem, traceList, displayName }: { item: TraceTimeTreeItem, traceItem: any, traceList: any[], displayName: string }) {
  const [content, setContent] = useState('no output yet')
  // const foundItem = traceList.find(item => item.id === item.trace_id);
  // console.log('found item: ' + traceItem.name)

  //   export interface TraceTimeTreeItem {
  //     trace_id: string
  //     name: string
  //     start_time: number
  //     end_time: number
  //     parent_trace_id?: string
  //     children?: TraceTimeTreeItem[]
  // }

  const handleViewJson = async (trace_id: string, e?: any) => {
    e?.preventDefault()
    console.log('trace_id: ' + trace_id)
    const textContent = JSON.stringify(traceItem.traceBody, null, 2)
    // alert(textContent);
    // const myDiv = document.getElementById('modal-content-' + trace_id);
    // alert(myDiv);
    setContent(textContent)
    // myDiv.value = textContent;
    document.getElementById('modal-' + trace_id).showModal()
  }

  const isRunnableSequence: boolean = displayName === 'RunnableSequence'
  const isRootCrewExecution: boolean = displayName === 'RootCrewExecution'
  const isChatOpenAI: boolean = displayName === 'ChatOpenAI'
  const isCrewAgentParser: boolean = displayName === 'CrewAgentParser'
  const isCrewAgentExecutor: boolean = displayName === 'CrewAgentExecutor'
  const isPromptTemplate: boolean = displayName === 'PromptTemplate'
  const isRunnableParallel: boolean = displayName === 'RunnableParallel<input,tools,tool_names,agent_scratchpad>'
  let isIntermediateSteps = false;
  let intermediateStepsString = 'none'
  let intermediate_steps: any[] = []

  if (isRunnableParallel) {
    try {
      intermediate_steps = traceItem.traceBody.inputs.intermediate_steps
      if (intermediate_steps.length > 0) {
        isIntermediateSteps = true;
        intermediateStepsString = JSON.stringify(intermediate_steps[intermediate_steps.length - 1], null, 2)
      }
    } finally {

    }
  }

  let isError = false;
  let errorText = 'none'
  if (!isRootCrewExecution && traceItem && traceItem.traceBody && traceItem.traceBody.error) {
    errorText = traceItem.traceBody.error
    isError = true;
  }


  return (
    <>

      <FeskDrawer name={`${displayName}`}>
        <div className='grid grid-cols-1 m-[10px] fesk-item'>

          <div className='flex items-start m-[10px]'>
            <div className='flex-1 grow mr-[10px]'>

              {isError && !isRunnableSequence && (
                <>
                  <div style={{ color: '#ffffff', backgroundColor: '#ed0f0f', fontSize: '12px', fontFamily: 'Helvetica', fontStyle: 'bold', padding: '10px' }}>
                    error message: <br />
                  </div>
                  <div style={{ color: '#ffffff', backgroundColor: '#000000', padding: '10px', borderStyle: 'solid', borderColor: '#ed0f0f', borderWidth: '2px' }}>
                    {errorText} <br /><br />
                  </div>
                </>
              )}

              {/* {isRunnableSequence && (
                <div>
                  last intermediate step: <br />
                  {intermediateStepsString} <br /><br />
                </div>
              )} */}

              {isCrewAgentExecutor && (
                <div>
                  input: <br />
                  {traceItem.traceBody.inputs.input} <br /><br />

                  tool_names: <br />
                  {traceItem.traceBody.inputs.tool_names} <br /><br />

                  tools: <br />
                  {traceItem.traceBody.inputs.tools} <br /><br />
                </div>
              )}

              {isPromptTemplate && (
                <div>
                  generated prompt: <br />
                  {traceItem.traceBody.outputs.output.text} <br /><br />
                </div>
              )}

              {isChatOpenAI && (
                <div>
                  LLM output: <br />
                  {traceItem.traceBody.outputs.generations[0].text} <br /><br />
                </div>
              )}

              {isCrewAgentParser && !isError && (
                <div>
                  result from calling LLM: <br /><br />

                  output: <br />
                  {traceItem.traceBody.outputs.output.log} <br /><br />

                  type: <br />
                  {traceItem.traceBody.outputs.output.type} <br /><br />

                  tool: <br />
                  {traceItem.traceBody.outputs.output.tool} <br /><br />

                  tool_input: <br />
                  {traceItem.traceBody.outputs.output.tool_input} <br /><br />

                </div>
              )}

              {isRunnableParallel && isIntermediateSteps && (
                <div>
                  tool: <br />
                  {intermediate_steps[intermediate_steps.length - 1][0].tool} <br /><br />

                  tool input: <br />
                  {intermediate_steps[intermediate_steps.length - 1][0].tool_input} <br /><br />

                  tool output: <br />
                  {intermediate_steps[intermediate_steps.length - 1][1]} <br /><br />

                </div>
              )}

              {/* const intermediate_steps: any[] = traceItem.traceBody.inputs.intermediate_steps
      if (intermediate_steps.length > 0) {
        isIntermediateSteps = true;
        intermediateStepsString = JSON.stringify(intermediate_steps[intermediate_steps.length - 1], null, 2)
      } */}


            </div>
            <div className='flex-none'>

              {!isRootCrewExecution && (

                <div className="dropdown dropdown-top dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-xs bg-zinc-800 hover:bg-zinc-600 border border-zinc-600 text-zinc-200 hover:text-zinc-900 mt-[5px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffffff" d="M12 6a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z" /></svg>
                  </div>
                  <ul tabIndex={0} className="dropdown-content text-xs fesk-menu menu bg-zinc-800 z-1 w-50 mt-[5px] mb-[2px] ml-[2px] mr-[2px] shadow-sm">

                    <li className='fesk-menu-li'><a onClick={() => handleViewJson(item.trace_id)}>view json</a></li>

                  </ul>
                </div>

              )}

            </div>
          </div>


          {item.children?.map((child, i) => {
            const foundItem = traceList.find(item => item.id === child.trace_id);
            return (

              <div className='m-[5px] fesk-item' key={`${item.trace_id}-child-${i}`}>

                <TraceTreeItemComponent item={child} traceItem={foundItem} traceList={traceList} displayName={child.name} />

              </div>

            )


          }
          )
          }
        </div>

        <FeskModal id={`modal-${item.trace_id}`}>

          <label className='fesk-card-h2'>JSON Trace Object</label>
          <span>
            <pre className='text-xs'>
              <div id={`modal-content-${item.trace_id}`}>
                {content}
              </div>
            </pre>
          </span>

        </FeskModal>

      </FeskDrawer>




    </>
  );

}