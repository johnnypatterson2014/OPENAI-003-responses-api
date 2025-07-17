

export interface WorkflowExecution {
    id: string
    name: string
    system_instructions: string
    inputText: string
    inputRole: string
    outputType: string
    outputText: string
    tasks?: TaskExecution[]
}

export interface TaskExecution {
    id: string
    name: string
    agentName: string
    actions: AgentAction[]
}

export interface AgentAction {
    id: string
    name: string
    type: string
}


export interface JsonData {
    id: string
    traceBody: any
}

export interface AgentData {
    id: string
    name: string
    backstory: string
}

export interface TaskData {
    id: string
    name: string
    description: string
    assigned_agent_id: string
}

export interface ToolData {
    id: string
    name: string
    type: string
    description: string
}





export interface Workflow {
    id: string
    name: string
    tasks: TaskExecution[]
}

