'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { WorkflowExecution, RefDataAgent, RefDataTools, RefDataTasks, WorkflowTask, WorkflowTree, WorkflowTreeNode, WorkflowTreeTask } from '@/components/aw/Constants';
import { remark } from 'remark';
import html from 'remark-html';

interface ContextProps {
  openaiResponseList: any[],
  workflowExecution: WorkflowExecution,
  isContextLoaded: boolean,
  isWorkflowSelected: boolean,
  setWorkflowSelected: (value: boolean) => void,
  workflowTree: WorkflowTree
}

const WorkflowContext = createContext<Partial<ContextProps>>({})

export function AgentWorkflowContext({
  jsonRequests,
  jsonInputs,
  agents,
  tools,
  tasks,
  children
}: {
  jsonRequests: any[],
  jsonInputs: any[],
  agents: RefDataAgent[],
  tools: RefDataTools[],
  tasks: RefDataTasks[]
  children: ReactNode
}) {
  const [openaiResponseList, setOpenaiResponseList] = useState<any[]>([])
  const [workflowExecution, setWorkflowExecution] = useState<WorkflowExecution>()
  const [isContextLoaded, setContextLoaded] = useState<boolean>(false)
  const [isWorkflowSelected, setWorkflowSelected] = useState<boolean>(false)
  const [workflowTree, setWorkflowTree] = useState<WorkflowTree>()

  useEffect(() => {
    const initializeChat = async () => {
      setOpenaiResponseList(jsonRequests);
      const wf = await processInput()
      setContextLoaded(true)
    }
    initializeChat()
  }, [])

  const convertMarkdownToHtml = async (markdown: string) => {
    const processedContent = await remark()
      .use(html)
      .process(markdown);
    return processedContent.toString();
  }

  const createWorkflowTask = async (jsonRequest: any) => {

    const sysInstructions = await convertMarkdownToHtml(jsonRequest.state.modelResponses[0].providerData.instructions);
    const sysInstrLineBreaks = sysInstructions.replaceAll("\\n", "<br />");
    const inputData = await convertMarkdownToHtml(jsonInputs[0].data[0].content[0].text);
    const inputDataLineBreaks = inputData.replaceAll("\\n", "<br />");
    const output = jsonRequest.state.modelResponses[0].output[0].type + ': ' + jsonRequest.state.modelResponses[0].output[0].name

    const task: WorkflowTask = {
      task_id: tasks[0].id,
      name: tasks[0].name,
      raw_json_request_id: jsonRequest.state.trace.id,
      raw_json_response_id: jsonRequest.state.trace.id, // TODO: need to fix
      properties: 'need to add properties here',
      system_instructions: sysInstrLineBreaks,
      input: inputDataLineBreaks,
      result: output
    }

    return task
  }

  const createWorkflowTree = async (jsonRequest: any) => {

    const node2: WorkflowTreeNode = {
      name: 'next step: transfer_to_online_researcher',
      isButton: false,
      id: '12'
    }

    const node5: WorkflowTreeNode = {
      name: 'node 5',
      isButton: false,
      id: '1',

    }

    const node3: WorkflowTreeNode = {
      name: 'agent: content marketing manager',
      isButton: true,
      id: '1',
      children: [node5]
    }

    const node4: WorkflowTreeNode = {
      name: 'node 4',
      isButton: true,
      id: '1',
    }

    const node1: WorkflowTreeNode = {
      name: 'POST /v1/responses',
      isButton: true,
      id: '11',
      children: [node2, node4]
    }



    const treeTask: WorkflowTreeTask = {
      name: 'perform task',
      tree_task_id: tasks[0].id,
      children: [node1, node3]
    }

    const tree: WorkflowTree = {
      name: 'Multi-Agent execution trace',
      tree_id: 'tree_id',
      workflow_id: jsonRequest.state.trace.id,
      children: [treeTask]
    }
    return tree
  }

  const processInput = async () => {

    // process just the first LLM json request (for now)
    const openaiResponse = jsonRequests[0];

    const workflow_tasks_temp = await createWorkflowTask(openaiResponse);

    // TODO: create tree
    const workflowTreeTemp = await createWorkflowTree(openaiResponse);

    const workflowExecutionTemp: WorkflowExecution = {
      workflow_id: openaiResponse.state.trace.id,
      name: openaiResponse.state.trace.workflow_name,
      workflow_tree_id: openaiResponse.state.trace.id, // need to genreate tree
      ref_data_agents: agents,
      ref_data_tasks: tasks,
      ref_data_tools: tools,
      workflow_tasks: [workflow_tasks_temp]

      // start_time: string (add later)
      // end_time: string (add later)

    }

    setWorkflowTree(workflowTreeTemp)
    setWorkflowExecution(workflowExecutionTemp);



    // const sysInstructions = await convertMarkdownToHtml(openaiResponse.state.modelResponses[0].providerData.instructions);
    // const sysInstrLineBreaks = sysInstructions.replaceAll("\\n", "<br />");
    // const inputData = await convertMarkdownToHtml(input.data[0].content[0].text);
    // const inputValue = inputData.replaceAll("\\n", "<br />");
    // const turns = openaiResponse.state.modelResponses.length;
    // const taskExecutionList: TaskExecution[] = []
    // const actionList: AgentAction[] = []
    // const staticAction: AgentAction = {
    //   id: 'action_root_1',
    //   name: 'POST /v1/responses',
    //   type: 'DecideNextStep'
    // }
    // actionList.push(staticAction)
    // const action2: AgentAction = {
    //   id: openaiResponse.state.modelResponses[0].output[0].id,
    //   name: openaiResponse.state.modelResponses[0].output[0].name,
    //   type: openaiResponse.state.modelResponses[0].output[0].type
    // }
    // actionList.push(action2)

    // for (let i = 0; i < turns; i++) {
    //   const modelResponse = openaiResponse.state.modelResponses[i]

    //   if (i == 0) {
    //     const task: TaskExecution = {
    //       id: 'task_1',
    //       name: 'Task Execution',
    //       agentName: 'content marketing manager',
    //       actions: actionList
    //     }
    //     taskExecutionList.push(task)
    //   } else {
    //     const task: TaskExecution = {
    //       id: modelResponse.responseId,
    //       name: modelResponse.output[0].name,
    //       agentName: 'online researcher',
    //       actions: [staticAction]
    //     }
    //     taskExecutionList.push(task)
    //   }
    // }

    // const wf: WorkflowExecution = {
    //   id: openaiResponse.state.trace.id,
    //   name: openaiResponse.state.trace.workflow_name,
    //   system_instructions: sysInstrLineBreaks,
    //   inputText: inputValue,
    //   inputRole: input.data[0].role,
    //   outputType: openaiResponse.state.modelResponses[0].output[0].type,
    //   outputText: openaiResponse.state.modelResponses[0].output[0].name,
    //   tasks: taskExecutionList
    // };

    // setWorkflowExecution(wf);
  }



  return (
    <WorkflowContext.Provider value={{
      openaiResponseList,
      workflowExecution,
      isWorkflowSelected,
      setWorkflowSelected,
      isContextLoaded,
      workflowTree
    }}>
      {children}
    </WorkflowContext.Provider>
  )
}

export const workflowContext = () => {
  return useContext(WorkflowContext) as ContextProps
}
