'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { WorkflowExecution, WorkflowTask, WorkflowTreeRoot, WorkflowTreeNode, TreeNodeMessage } from '@/components/aw/Constants';
import { remark } from 'remark';
import html from 'remark-html';

interface ContextProps {
  openaiResponses: any[],
  workflowData: WorkflowTreeRoot,
  isContextLoaded: boolean,
  selectedTreeNode: WorkflowTreeNode,
  setSelectedTreeNode: (node: WorkflowTreeNode) => void
  workflowTreeData: any[]
}

const WorkflowContext = createContext<Partial<ContextProps>>({})

export function AgentWorkflowContext_v2({
  openaiResponseList,
  dataModel,
  children
}: {
  openaiResponseList: any[]
  dataModel: WorkflowTreeRoot
  children: ReactNode
}) {
  const [openaiResponses, setOpenaiResponses] = useState<any[]>([])
  const [isContextLoaded, setContextLoaded] = useState<boolean>(false)
  const [workflowData, setWorkflowData] = useState<WorkflowTreeRoot>()
  const [selectedTreeNode, setSelectedTreeNode] = useState<WorkflowTreeNode>()
  const [workflowTreeData, setWorkflowTreeData] = useState<any[]>([])

  let workflowTreeDataTemp: any[] = []

  useEffect(() => {
    const initializeChat = async () => {

      // console.log('datamodel: ' + JSON.stringify(dataModel))

      if (dataModel.children && dataModel.children.length > 0) {
        for (let i = 0; i < dataModel.children.length; i++) {
          // dataModel.children[i]
          convertToHtml(dataModel.children[i])


        }
      }




      if (dataModel.children && dataModel.children.length > 0) {
        for (let i = 0; i < dataModel.children.length; i++) {
          mapTreeData(dataModel.children[i])
        }
      }
      setWorkflowTreeData(workflowTreeDataTemp)
      setOpenaiResponses(openaiResponseList)
      setWorkflowData(dataModel);
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

  const convertToHtml = async (node: WorkflowTreeNode) => {
    let temp = await convertMarkdownToHtml(node.systemInstructions)
    node.systemInstructions = temp.replaceAll("\\n", "<br />");

    if (node.input && node.input.length > 0) {
      for (let y = 0; y < node.input.length; y++) {
        let temp = await convertMarkdownToHtml(node.input[y].content)
        node.input[y].content = temp.replaceAll("\\n", "<br />");
      }
    }

    if (node.output) {
      let temp = await convertMarkdownToHtml(node.output.content)
      node.output.content = temp.replaceAll("\\n", "<br />");
    }

    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        convertToHtml(node.children[i])
      }
    }
  }

  const mapTreeData = (node: WorkflowTreeNode) => {
    const item = {
      id: node.id,
      body: node
    }
    workflowTreeDataTemp.push(item)
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        mapTreeData(node.children[i])
      }
    }
  }




  return (
    <WorkflowContext.Provider value={{
      openaiResponses,
      workflowData,
      isContextLoaded,
      selectedTreeNode,
      setSelectedTreeNode,
      workflowTreeData
    }}>
      {children}
    </WorkflowContext.Provider>
  )
}

export const workflowContext_v2 = () => {
  return useContext(WorkflowContext) as ContextProps
}
