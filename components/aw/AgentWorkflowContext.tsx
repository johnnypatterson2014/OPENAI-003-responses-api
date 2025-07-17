'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { AgentAction, TaskExecution, Workflow, WorkflowExecution } from '@/components/aw/Constants';
import { remark } from 'remark';
import html from 'remark-html';

interface ContextProps {
  openaiResponseList: any[],
  workflowExecution: WorkflowExecution,
  isContextLoaded: boolean,
  isWorkflowSelected: boolean,
  setWorkflowSelected: (value: boolean) => void
}

const WorkflowContext = createContext<Partial<ContextProps>>({})

export function AgentWorkflowContext({ openaiStub, input, children }: { openaiStub: any[], input: any, children: ReactNode }) {
  const [openaiResponseList, setOpenaiResponseList] = useState<any[]>([])
  const [workflowExecution, setWorkflowExecution] = useState<WorkflowExecution>()
  const [isContextLoaded, setContextLoaded] = useState<boolean>(false)
  const [isWorkflowSelected, setWorkflowSelected] = useState<boolean>(false)

  const convertMarkdownToHtml = async (markdown: string) => {
    const processedContent = await remark()
      .use(html)
      .process(markdown);
    return processedContent.toString();
  }

  const processInput = async (openaiResponses: any[]) => {
    const openaiResponse = openaiResponses[0];
    const sysInstructions = await convertMarkdownToHtml(openaiResponse.state.modelResponses[0].providerData.instructions);
    const sysInstrLineBreaks = sysInstructions.replaceAll("\\n", "<br />");

    const inputData = await convertMarkdownToHtml(input.data[0].content[0].text);
    // const inputData = input.data[0].content[0].text;
    const inputValue = inputData.replaceAll("\\n", "<br />");

    const turns = openaiResponse.state.modelResponses.length;

    const taskExecutionList: TaskExecution[] = []




    const actionList: AgentAction[] = []
    const staticAction: AgentAction = {
      // id: modelResponse.output[0].id,
      id: 'action_root_1',
      name: 'POST /v1/responses',
      type: 'DecideNextStep'
    }
    actionList.push(staticAction)

    const action2: AgentAction = {
      id: openaiResponse.state.modelResponses[0].output[0].id,
      name: openaiResponse.state.modelResponses[0].output[0].name,
      type: openaiResponse.state.modelResponses[0].output[0].type
    }
    actionList.push(action2)

    for (let i = 0; i < turns; i++) {
      const modelResponse = openaiResponse.state.modelResponses[i]

      if (i == 0) {
        const task: TaskExecution = {
          id: 'task_1',
          name: 'Task Execution',
          agentName: 'content marketing manager',
          actions: actionList
        }
        taskExecutionList.push(task)
      } else {
        const task: TaskExecution = {
          // id: modelResponse.output[0].id,
          id: modelResponse.responseId,
          name: modelResponse.output[0].name,
          agentName: 'online researcher',
          actions: [staticAction]
        }
        taskExecutionList.push(task)
      }


    }

    const wf: WorkflowExecution = {
      id: openaiResponse.state.trace.id,
      name: openaiResponse.state.trace.workflow_name,
      system_instructions: sysInstrLineBreaks,
      inputText: inputValue,
      inputRole: input.data[0].role,
      outputType: openaiResponse.state.modelResponses[0].output[0].type,
      outputText: openaiResponse.state.modelResponses[0].output[0].name,
      tasks: taskExecutionList
    };

    setWorkflowExecution(wf);
  }

  useEffect(() => {
    const initializeChat = async (stub: any[]) => {
      setOpenaiResponseList(stub);
      const wf = await processInput(stub)
      setContextLoaded(true)
    }
    initializeChat(openaiStub)
  }, [])

  return (
    <WorkflowContext.Provider value={{
      openaiResponseList,
      workflowExecution,
      isWorkflowSelected,
      setWorkflowSelected,
      isContextLoaded
    }}>
      {children}
    </WorkflowContext.Provider>
  )
}

export const workflowContext = () => {
  return useContext(WorkflowContext) as ContextProps
}
