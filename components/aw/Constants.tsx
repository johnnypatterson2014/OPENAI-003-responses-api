

export interface WorkflowExecution {
    workflow_id: string
    name: string
    start_time?: string
    end_time?: string
    workflow_tree_id: string
    workflow_tasks: WorkflowTask[]
    ref_data_agents: RefDataAgent[]
    ref_data_tasks: RefDataTasks[]
    ref_data_tools: RefDataTools[]
}

export interface WorkflowTask {
    task_id: string
    name: string
    raw_json_request_id: string
    raw_json_response_id?: string
    properties?: any
    system_instructions?: any
    input?: any
    result?: any
}


export interface WorkflowTree {
    name: string
    tree_id: string
    workflow_id: string
    children: WorkflowTreeTask[]
}

export interface WorkflowTreeTask {
    name: string
    tree_task_id: string
    children?: WorkflowTreeNode[]
}


export interface WorkflowTreeNode {
    id: string
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

