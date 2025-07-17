'use client';

import { ReactNode } from 'react'
import { SVG_ICON_LOAD } from '@/config/FeskConstants'
import Button2 from '@/components/aw/Button2'
import Drawer from '@/components/aw/Drawer'
import { workflowContext } from '@/components/aw/AgentWorkflowContext';

export default function MainContentDisplay() {
    const { workflowExecution, isContextLoaded, isWorkflowSelected } = workflowContext()

    return (
        <>
            {isWorkflowSelected && (
                <>
                    <div className='flex flex-row'>

                        {isContextLoaded && (
                            <>
                                <div className='flex-none'>
                                    <Button2>
                                        view request json
                                    </Button2>
                                </div>

                                <div className='flex-none ml-[10px]'>
                                    <Button2>
                                        view input json
                                    </Button2>
                                </div>
                            </>
                        )}

                    </div>

                    <div className='flex flex-row aw-margin-top-15'>
                        <div className='flex-1'>

                            {isContextLoaded && workflowExecution.tasks && (
                                <>
                                    <div className='aw-margin-bottom'>
                                        <span className='fesk-h2 text-blue-300'>
                                            {workflowExecution.tasks[0].name}
                                        </span>
                                        <span className='ml-[10px] text-blue-300'>
                                            Agent: {workflowExecution.tasks[0].agentName}
                                        </span>
                                    </div>
                                </>
                            )}

                        </div>

                    </div>


                    {isContextLoaded && (
                        <div className='flex flex-row'>

                            <div className='flex-1'>

                                <Drawer name='properties'>
                                    <div className='grid col-auto'>
                                        <div className='aw-property'>

                                            <div className='ml-4 text-blue-300'>
                                                id: trace_600dfddee81249bd8c0d99401047ff68 <br />
                                                created: Jul 6, 2025, 2:09 AM <br />
                                                model: gpt-4.1<br />
                                                <br />

                                            </div>

                                        </div>

                                    </div>
                                </Drawer>

                                <Drawer name='system instructions'>
                                    <div className='grid col-auto'>
                                        <div className='aw-property'>

                                            <div className='dangerouslySetInnerHTML'>
                                                <div dangerouslySetInnerHTML={{ __html: workflowExecution.system_instructions }} className='grow ml-4 text-blue-300'></div>
                                            </div>

                                        </div>

                                    </div>
                                </Drawer>

                                <Drawer name='tools'>
                                    <div className='grid col-auto'>
                                        <div className='aw-property'>

                                            <div className='ml-4 text-blue-300'>
                                                &lt; add list of available tools here &gt;

                                            </div>



                                        </div>

                                    </div>
                                </Drawer>

                                <Drawer name='input'>
                                    <div className='grid col-auto'>
                                        <div className='aw-property'>

                                            <div className='fesk-h2'>{workflowExecution.inputRole}:</div>
                                            <div className='dangerouslySetInnerHTML'>

                                                <div dangerouslySetInnerHTML={{ __html: workflowExecution.inputText }} className='aw-overflow-wrap grow ml-4 text-blue-300'></div>
                                            </div>

                                        </div>

                                    </div>
                                </Drawer>

                                <Drawer name='result'>
                                    <div className='grid col-1'>
                                        <div className='aw-property'>

                                            <div className='ml-4 text-blue-300'>
                                                action: {workflowExecution.outputText} <br />

                                                instructions: web_search_call <br />

                                                query: latest research on Agentic Behavior

                                            </div>

                                        </div>

                                        {/* <div className='aw-property'>
                                            <div className='fesk-h2'>user:</div>

                                            <div className='ml-4 text-blue-300'>
                                                Use the online researcher to write a report on Agentic Behavior.
                                                <br />

                                            </div>

                                        </div> */}

                                    </div>
                                </Drawer>

                            </div>

                        </div>
                    )}
                </>
            )}
        </>
    );

}