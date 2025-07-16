'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { AgentAction, TaskExecution, Workflow, workflow_stub_data } from '@/components/aw/Constants';

interface ContextProps {
  openaiResponseList: any[]
  workflow: Workflow
  mainContent: any,
  setDisplayContent: (content: string) => Promise<void>
}

const WorkflowContext = createContext<Partial<ContextProps>>({})

export function AgentWorkflowContext({ openaiStub, my_workflow, children }: { openaiStub: any[], my_workflow: Workflow, children: ReactNode }) {
  const [openaiResponseList, setOpenaiResponseList] = useState<any[]>([])
  const [workflow, setWorkflow] = useState<Workflow>()
  const [mainContent, setMainContent] = useState<any>('no content yet')

  useEffect(() => {
    const initializeChat = (stub: any[], workflow: Workflow) => {
      setOpenaiResponseList(stub);
      setWorkflow(workflow);
    }
    initializeChat(openaiStub, my_workflow)
  }, [])



  const setDisplayContent = async (content: string) => {
    setMainContent(content)
  }

  return (
    <WorkflowContext.Provider value={{
      openaiResponseList,
      workflow,
      mainContent,
      setDisplayContent
    }}>
      {children}
    </WorkflowContext.Provider>
  )
}

export const workflowContext = () => {
  return useContext(WorkflowContext) as ContextProps
}
