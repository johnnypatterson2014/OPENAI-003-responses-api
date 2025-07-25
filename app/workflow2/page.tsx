import { promises as fs } from 'fs';
import { AgentWorkflowContext2 } from '@/components/aw/AgentWorkflowContext2';
import AgentWorkflow from '@/components/aw/AgentWorkflow';
import { RefDataAgent, RefDataTools, RefDataTasks, WorkflowExecution } from '@/components/aw/Constants';

const ref_data_workflow = await fs.readFile(process.cwd() + '/app/data/testing_2025.07.24/datamodel-final.json', 'utf8');


export default function Home() {

    const workflow: WorkflowExecution = JSON.parse(ref_data_workflow)

    return (
        <>

            {/* <AgentWorkflow openaiStub={[turn_1, turn_2, turn_3]} my_workflow={workflow} /> */}
            {/* <AgentWorkflowContext jsonRequests={[turn_1, turn_2, turn_3]} jsonInputs={[turn_1_input]} agents={agents} tools={tools} tasks={tasks} > */}
            <AgentWorkflowContext2 workflow_data={workflow} >
                <AgentWorkflow />
            </AgentWorkflowContext2>

        </>
    );
}
