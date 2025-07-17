import { promises as fs } from 'fs';
import { AgentWorkflowContext } from '@/components/aw/AgentWorkflowContext';
import AgentWorkflow from '@/components/aw/AgentWorkflow';
import { AgentAction, TaskExecution, Workflow } from '@/components/aw/Constants';

const openai_turn_1 = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-1.json', 'utf8');
const openai_turn_2 = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-2.json', 'utf8');
const openai_turn_3 = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-3.json', 'utf8');

const openai_turn_1_v2 = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-1-v2.json', 'utf8');
const openai_turn_1_input = await fs.readFile(process.cwd() + '/app/data/openai-agent-turn-1-input.json', 'utf8');

export default function Home() {

    const turn_1 = JSON.parse(openai_turn_1)
    const turn_2 = JSON.parse(openai_turn_2)
    const turn_3 = JSON.parse(openai_turn_3)

    const turn_1_v2 = JSON.parse(openai_turn_1_v2)
    const turn_1_input = JSON.parse(openai_turn_1_input)

    return (
        <>

            {/* <AgentWorkflow openaiStub={[turn_1, turn_2, turn_3]} my_workflow={workflow} /> */}
            <AgentWorkflowContext openaiStub={[turn_1_v2]} input={turn_1_input} >
                <AgentWorkflow />
            </AgentWorkflowContext>

        </>
    );
}
