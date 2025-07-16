import { promises as fs } from 'fs';
import { AgentWorkflowContext } from '@/components/aw/AgentWorkflowContext';
import AgentWorkflow from '@/components/aw/AgentWorkflow';
import { AgentAction, TaskExecution, Workflow, workflow_stub_data, task_execution_stub } from '@/components/aw/Constants';

const openai_turn_1 = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-1.json', 'utf8');
const openai_turn_2 = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-2.json', 'utf8');
const openai_turn_3 = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-3.json', 'utf8');

export default function Home() {

    const turn_1 = JSON.parse(openai_turn_1)
    const turn_2 = JSON.parse(openai_turn_2)
    const turn_3 = JSON.parse(openai_turn_3)

    const task: TaskExecution = {
        id: 'task_id',
        name: 'task_name',
        type: 'task_type',
        actions: [

        ]
    }

    const workflow: Workflow = {
        id: 'Workflow Id',
        name: 'Workflow: OpenAI Agents',
        tasks: [
            task
        ]
    }


    return (
        <>

            {/* <AgentWorkflow openaiStub={[turn_1, turn_2, turn_3]} my_workflow={workflow} /> */}
            <AgentWorkflowContext openaiStub={[turn_1, turn_2, turn_3]} my_workflow={workflow}>
                <AgentWorkflow />
            </AgentWorkflowContext>

        </>
    );
}
