
export interface WorkflowExecution {
    workflow_name: string
    trace_id: string
    assignedAgent: string
    task_run_list: WorkflowTask[]
    start_time?: string
    end_time?: string
}


export interface WorkflowOriginalInput {
    name: string
    content: any
    type: string
}

export interface WorkflowTask {
    task_id: string
    order_index: number
    instructions: any
    agentName: string
    originalInput?: WorkflowOriginalInput[]
    sub_task_list: WorkflowSubTask[]
    delegate_task?: WorkflowTask
}

export interface WorkflowSubTask {
    id: string
    order_index: number
    role: string
    subTaskDescription: string
    type: string
    subType: string
    name: string
    instructions: string
    output: any
    sourceAgent: string
    targetAgent: string
    queryType?: string
    query?: string
    output_annotations?: any[]
}



export interface WorkflowTree {
    name: string
    workflow_id: string
    children: WorkflowTreeTask[]
}

export interface WorkflowTreeTask {
    name: string
    order_index: number
    tree_task_id: string
    children?: WorkflowTreeNode[]
    delegate_task?: WorkflowTreeTask
}


export interface WorkflowTreeNode {
    id: string
    order_index: number
    name: string
    isButton: boolean
    children?: WorkflowTreeNode[]
}







export interface RefDataAgent {
    id: string
    name: string
    system_instructions: string
    model: string
    tools: string[]
}

export interface RefDataTools {
    id: string
    name: string
    description: string
    type: string
}

export interface RefDataTasks {
    id: string
    name: string
    description: string
}

