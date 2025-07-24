import { promises as fs } from 'fs';
import { AgentWorkflowContext } from '@/components/aw/AgentWorkflowContext';
import { AgentWorkflowContext_v2 } from '@/components/aw/AgentWorkflowContext_v2';
import AgentWorkflow_v2 from '@/components/aw/AgentWorkflow_v2';
import { RefDataAgent, RefDataTools, RefDataTasks, WorkflowExecution } from '@/components/aw/Constants';

const openai_response_1 = await fs.readFile(process.cwd() + '/app/data/crewai-project-002/openai-response-1.json', 'utf8');
const openai_response_2 = await fs.readFile(process.cwd() + '/app/data/crewai-project-002/openai-response-2.json', 'utf8');
const openai_response_3 = await fs.readFile(process.cwd() + '/app/data/crewai-project-002/openai-response-3.json', 'utf8');
const openai_response_4 = await fs.readFile(process.cwd() + '/app/data/crewai-project-002/openai-response-4.json', 'utf8');
const openai_response_5 = await fs.readFile(process.cwd() + '/app/data/crewai-project-002/openai-response-5.json', 'utf8');
const openai_response_6 = await fs.readFile(process.cwd() + '/app/data/crewai-project-002/openai-response-6.json', 'utf8');
const data_model = await fs.readFile(process.cwd() + '/app/data/crewai-project-002/workflow-datamodel.json', 'utf8');


export default function Home() {

    const turn_1 = JSON.parse(openai_response_1)
    const turn_2 = JSON.parse(openai_response_2)
    const turn_3 = JSON.parse(openai_response_3)
    const turn_4 = JSON.parse(openai_response_4)
    const turn_5 = JSON.parse(openai_response_5)
    const turn_6 = JSON.parse(openai_response_6)
    const dataModel = JSON.parse(data_model)
    const openaiResponseMap = [
        {
            id: turn_1.id,
            body: turn_1
        },
        {
            id: turn_2.id,
            body: turn_2
        },
        {
            id: turn_3.id,
            body: turn_3
        },
        {
            id: turn_4.id,
            body: turn_4
        },
        {
            id: turn_5.id,
            body: turn_5
        },
        {
            id: turn_6.id,
            body: turn_6
        }
    ]

    return (
        <>
            <AgentWorkflowContext_v2 openaiResponseList={openaiResponseMap} dataModel={dataModel}>
                <AgentWorkflow_v2 subNodeName='execute sequence' />
            </AgentWorkflowContext_v2>

        </>
    );
}
