

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

export interface AgentAction {
    id: string
    type: string
    trace_id: string
}

export interface TaskExecution {
    id: string
    name: string
    type: string
    actions: AgentAction[]
}

export interface Workflow {
    id: string
    name: string
    tasks: TaskExecution[]
}

export const agent_action_stub: AgentAction = {
    id: 'AgentAction testing id',
    type: 'AgentAction',
    trace_id: 'trace_id'
}

export const agent_action_stub2: AgentAction = {
    id: 'AgentAction2 testing id',
    type: 'AgentAction 2',
    trace_id: 'trace_id'
}

export const task_execution_stub: TaskExecution = {
    id: 'TaskExecution id',
    name: 'TaskExecution name',
    type: 'TaskExecution',
    actions: [
        agent_action_stub,
        agent_action_stub2
    ]
}

export const task_execution_stub2: TaskExecution = {
    id: 'TaskExecution id2',
    name: 'TaskExecution name2',
    type: 'TaskExecution',
    actions: [
        agent_action_stub,
        agent_action_stub2
    ]
}

export const workflow_stub_data: Workflow = {
    id: 'testing',
    name: 'workflow name',
    tasks: [
        task_execution_stub,
        task_execution_stub2
    ]
}

