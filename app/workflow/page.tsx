import { promises as fs } from 'fs';
import { AgentWorkflowContext } from '@/components/aw/AgentWorkflowContext';
import AgentWorkflow from '@/components/aw/AgentWorkflow';
import { RefDataAgent, RefDataTools, RefDataTasks, WorkflowExecution } from '@/components/aw/Constants';

const openai_turn_1 = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-1.json', 'utf8');
const openai_turn_2 = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-2.json', 'utf8');
const openai_turn_3 = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-3.json', 'utf8');
const openai_turn_1_input = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-1-input.json', 'utf8');

// const openai_turn_1_v2 = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-1-v2.json', 'utf8');

const ref_data_agents = await fs.readFile(process.cwd() + '/app/data/ref-data-agents.json', 'utf8');
const ref_data_tools = await fs.readFile(process.cwd() + '/app/data/ref-data-tools.json', 'utf8');
const ref_data_tasks = await fs.readFile(process.cwd() + '/app/data/ref-data-tasks.json', 'utf8');

const ref_data_workflow = await fs.readFile(process.cwd() + '/app/data/workflow-datamodel-1.json', 'utf8');


export default function Home() {

    const turn_1 = JSON.parse(openai_turn_1)
    const turn_2 = JSON.parse(openai_turn_2)
    const turn_3 = JSON.parse(openai_turn_3)
    const turn_1_input = JSON.parse(openai_turn_1_input)

    // const turn_1_v2 = JSON.parse(openai_turn_1)

    const agents: RefDataAgent[] = JSON.parse(ref_data_agents)
    const tools: RefDataTools[] = JSON.parse(ref_data_tools)
    const tasks: RefDataTasks[] = JSON.parse(ref_data_tasks)

    const workflow: WorkflowExecution = JSON.parse(ref_data_workflow)

    return (
        <>

            {/* <AgentWorkflow openaiStub={[turn_1, turn_2, turn_3]} my_workflow={workflow} /> */}
            {/* <AgentWorkflowContext jsonRequests={[turn_1, turn_2, turn_3]} jsonInputs={[turn_1_input]} agents={agents} tools={tools} tasks={tasks} > */}
            <AgentWorkflowContext workflow_data={workflow} agents={agents} tools={tools} tasks={tasks} >
                <AgentWorkflow />
            </AgentWorkflowContext>

        </>
    );
}
