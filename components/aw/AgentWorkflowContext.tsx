'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { WorkflowExecution, WorkflowSubTask, RefDataAgent, RefDataTools, RefDataTasks, WorkflowTask, WorkflowTree, WorkflowTreeNode, WorkflowTreeTask } from '@/components/aw/Constants';
import { remark } from 'remark';
import html from 'remark-html';

interface ContextProps {
  openaiResponseList: any[],
  workflowExecution: WorkflowExecution,
  isContextLoaded: boolean,
  isWorkflowSelected: boolean,
  setWorkflowSelected: (value: boolean) => void,
  workflowTree: WorkflowTree,
  isTaskSelected: boolean,
  setTaskSelected: (value: boolean) => void,
  // taskList: any[],
  taskId: string,
  setTaskId: (id: string) => void
}

const WorkflowContext = createContext<Partial<ContextProps>>({})

export function AgentWorkflowContext({
  workflow_data,
  agents,
  tools,
  tasks,
  children
}: {
  workflow_data: WorkflowExecution,
  agents: RefDataAgent[],
  tools: RefDataTools[],
  tasks: RefDataTasks[]
  children: ReactNode
}) {
  const [workflowExecution, setWorkflowExecution] = useState<WorkflowExecution>()
  const [isContextLoaded, setContextLoaded] = useState<boolean>(false)
  const [isWorkflowSelected, setWorkflowSelected] = useState<boolean>(false)
  const [workflowTree, setWorkflowTree] = useState<WorkflowTree>()
  const [refData, setRefData] = useState<any>()

  const [isTaskSelected, setTaskSelected] = useState<boolean>(false)
  const [taskId, setTaskId] = useState<string>()
  // const [taskList, setTaskList] = useState<any[]>([])




  useEffect(() => {
    const initializeChat = async () => {
      const workflow: WorkflowExecution = await formatWorkflowExecution()
      setWorkflowExecution(workflow);
      const wf = await processInput()
      const refDataMap = {
        agents: agents,
        tools: tools,
        tasks: tasks
      }
      setRefData(refDataMap)
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

  const formatWorkflowExecution = async () => {


    for (let i = 0; i < workflow_data.task_run_list.length; i++) {
      let temp = await convertMarkdownToHtml(workflow_data.task_run_list[i].instructions)
      workflow_data.task_run_list[i].instructions = temp.replaceAll("\\n", "<br />");

      if (workflow_data.task_run_list[i].delegate_task) {
        temp = await convertMarkdownToHtml(workflow_data.task_run_list[i].delegate_task?.instructions)
        workflow_data.task_run_list[i].delegate_task.instructions = temp.replaceAll("\\n", "<br />");

        for (let y = 0; y < workflow_data.task_run_list[i].delegate_task?.sub_task_list.length; y++) {
          temp = await convertMarkdownToHtml(workflow_data.task_run_list[i].delegate_task.sub_task_list[y].instructions)
          workflow_data.task_run_list[i].delegate_task.sub_task_list[y].instructions = temp.replaceAll("\\n", "<br />");

          temp = await convertMarkdownToHtml(workflow_data.task_run_list[i].delegate_task.sub_task_list[y].subTaskDescription)
          workflow_data.task_run_list[i].delegate_task.sub_task_list[y].subTaskDescription = temp.replaceAll("\\n", "<br />");

          temp = await convertMarkdownToHtml(workflow_data.task_run_list[i].delegate_task.sub_task_list[y].output)
          workflow_data.task_run_list[i].delegate_task.sub_task_list[y].output = temp.replaceAll("\\n", "<br />");

        }
      }
      for (let y = 0; y < workflow_data.task_run_list[i].sub_task_list.length; y++) {
        temp = await convertMarkdownToHtml(workflow_data.task_run_list[i].sub_task_list[y].instructions)
        workflow_data.task_run_list[i].sub_task_list[y].instructions = temp.replaceAll("\\n", "<br />");

        temp = await convertMarkdownToHtml(workflow_data.task_run_list[i].sub_task_list[y].output)
        workflow_data.task_run_list[i].sub_task_list[y].output = temp.replaceAll("\\n", "<br />");

        temp = await convertMarkdownToHtml(workflow_data.task_run_list[i].sub_task_list[y].subTaskDescription)
        workflow_data.task_run_list[i].sub_task_list[y].subTaskDescription = temp.replaceAll("\\n", "<br />");

      }

      if (workflow_data.task_run_list[i].originalInput && workflow_data.task_run_list[i].originalInput.length > 0) {
        for (let y = 0; y < workflow_data.task_run_list[i].originalInput.length; y++) {
          let temp = await convertMarkdownToHtml(workflow_data.task_run_list[i].originalInput[y].content)
          workflow_data.task_run_list[i].originalInput[y].content = temp.replaceAll("\\n", "<br />");
        }
      }

    }

    return workflow_data;
  }

  const getSubTasks = async (sub_task_list: WorkflowSubTask[]) => {
    const subTaskList: WorkflowTreeNode[] = []

    for (let i = 0; i < sub_task_list.length; i++) {
      const subtask = sub_task_list[i]
      const child_node: WorkflowTreeNode = {
        id: subtask.id,
        order_index: i,
        name: subtask.name,
        isButton: false
      }
      subTaskList.push(child_node)
    }

    subTaskList.sort((a, b) => a.order_index - b.order_index);
    return subTaskList
  }

  const createWorkflowTree = async () => {

    // create tree tasks
    const treeTaskList: WorkflowTreeTask[] = []
    for (let i = 0; i < workflow_data.task_run_list.length; i++) {
      const task: WorkflowTask = workflow_data.task_run_list[i]

      let delegate: any = null
      if (task.delegate_task) {
        delegate = {
          name: task.delegate_task.agentName,
          order_index: 10,
          tree_task_id: task.delegate_task.task_id,
          children: await getSubTasks(task.delegate_task.sub_task_list)
        }

        const treeTask: WorkflowTreeTask = {
          name: task.agentName,
          order_index: i,
          tree_task_id: task.task_id,
          children: await getSubTasks(task.sub_task_list),
          delegate_task: delegate
        }

        treeTaskList.push(treeTask)

      } else {
        const treeTask: WorkflowTreeTask = {
          name: task.agentName,
          order_index: i,
          tree_task_id: task.task_id,
          children: await getSubTasks(task.sub_task_list),
          delegate_task: delegate
        }

        treeTaskList.push(treeTask)
      }
    }

    treeTaskList.sort((a, b) => a.order_index - b.order_index);

    const tree: WorkflowTree = {
      name: workflow_data.workflow_name,
      workflow_id: workflow_data.trace_id,
      children: treeTaskList
    }
    return tree
  }

  // const createTaskList = async () => {
  //   const taskListTemp: any[] = []
  //   for (let i = 0; i < workflow_data.task_run_list.length; i++) {
  //     const map = {
  //       id: workflow_data.task_run_list[i].task_id,
  //       body: workflow_data.task_run_list[i]
  //     }
  //     taskListTemp.push(map)
  //   }
  //   return taskListTemp
  // }



  const processInput = async () => {

    const workflowTreeTemp = await createWorkflowTree();
    // const taskListTemp = await createTaskList();
    setWorkflowTree(workflowTreeTemp)
    setWorkflowExecution(workflow_data);
    // setTaskList(taskListTemp)
    setWorkflowSelected(true)

  }



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

  return (
    <WorkflowContext.Provider value={{
      workflowExecution,
      isWorkflowSelected,
      setWorkflowSelected,
      isContextLoaded,
      workflowTree,
      isTaskSelected,
      setTaskSelected,
      // taskList,
      taskId,
      setTaskId,
    }}>
      {children}
    </WorkflowContext.Provider>
  )
}

export const workflowContext = () => {
  return useContext(WorkflowContext) as ContextProps
}
