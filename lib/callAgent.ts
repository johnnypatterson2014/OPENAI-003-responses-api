
'use server'

import { Agent, run, tool, webSearchTool, AgentInputItem, withTrace } from '@openai/agents';
import { promises as fs } from "fs";
import { z } from 'zod';
import { RECOMMENDED_PROMPT_PREFIX } from '@openai/agents-core/extensions';

const NamedUrl = z.object({
  name: z.string(),
  url: z.string(),
});

const BusinessareaInfo = z.object({
  name: z.string(),
  url: z.string(),
  technology: z.string(),
  businessarea: z.string(),
  blog_articles_urls: z.array(z.string()),
  youtube_videos_urls: z.array(NamedUrl),

});

const BusinessareaInfoList = z.object({
  name: z.string(),
  url: z.string(),
  businessareas: z.array(BusinessareaInfo),
});

const technologies: string[] = ['Agentic AI']
const businessareas: string[] = ['Customer Service']

const task_technology_research: string = `
      Research the business areas 'Customer Service' for the 'Agentic AI' technology. 
                For each business area, find the URLs for 3 recent blog articles and the URLs and titles for
                3 recent YouTube videos in each business area.
                Return this collected information in a JSON object.
                               
                Helpful Tips:
                - To find the blog articles names and URLs, perform searches on Google such like the following:
                    - "Agentic AI [BUSINESS AREA HERE] blog articles"
                - To find the youtube videos, perform searches on YouTube such as the following:
                    - "Agentic AI in [BUSINESS AREA HERE]"
                               
                Important:
                - Once you've found the information, immediately stop searching for additional information.
                - Only return the requested information. NOTHING ELSE!
                - Do not generate fake information. Only return the information you find. Nothing else!
                - Do not stop researching until you find the requested information for each business area in the technology.

                Expected output:
                A JSON object containing the researched information for each business area in the technology.
`

const task_manage_research: string = `
      Based on the list of technologies 'Agentic AI' and the business areas 'Customer Service',
                use the results from the Research Agent to research each business area in each technology.
                to put together a json object containing the URLs for 3 blog articles, the URLs and title 
                for 3 YouTube interviews for each business area in each technology.

      Expected output:
      A json object containing the URLs for 3 blog articles and the URLs and 
                    titles for 3 YouTube interviews for each business area in each technology.
`

const research_agent_instructions: string = `
As a Research Agent, you are responsible for looking up specific business areas 
                within a technology and gathering relevant information.
                
                Important:
                - Once you've found the information, immediately stop searching for additional information.
                - Only return the requested information. NOTHING ELSE!
                - Do not generate fake information. Only return the information you find. Nothing else!

    Look up the specific business areas for a given technology and find urls for 3 recent blog articles and 
                the url and title for 3 recent YouTube videos in the specified business area. It is your goal to return this collected 
                information in a JSON object.
`

const research_manager_instructions: string = `
As a Research Manager, you are responsible for aggregating all the researched information into a list.
  Generate a list of JSON objects containing the urls for 3 recent blog articles and 
                the url and title for 3 recent YouTube videos, for each technology in each business area.
             
                Technologies: 'Agentic AI'
                Business Areas: 'Customer Service'

                Important:
                - The final list of JSON objects must include all technologies and business areas. Do not leave any out.
                - If you can't find information for a specific industry or business area, fill in the information with the word "MISSING".
                - Do not generate fake information. Only return the information you find. Nothing else!
                - Do not stop researching until you find the requested information for each business area in each technology.
                - All the technologies and business areas exist so keep researching until you find the information for each one.
                - Make sure you each researched business area for each technology contains 3 blog articles and 3 YouTube videos.
`

const research_agent = new Agent({
  name: 'research agent',
  model: 'gpt-4.1',
  tools: [webSearchTool()],
  outputType: BusinessareaInfo,
  instructions: research_agent_instructions
});

const research_manager = new Agent({
  name: 'research manager',
  tools: [webSearchTool()],
  model: 'gpt-4.1',
  handoffs: [research_agent],
  outputType: BusinessareaInfoList,
  instructions: research_manager_instructions
});


let thread: AgentInputItem[] = [];

async function callLLM_research_agent(text: string) {
  const result = await run(
    research_agent,
    thread.concat({ role: 'user', content: text }),
  );

  thread = result.history; // Carry over history + newly generated items
  return JSON.stringify(result);
}

async function callLLM_research_manager(text: string) {
  const result = await run(
    research_manager,
    thread.concat({ role: 'user', content: text }),
  );

  thread = result.history; // Carry over history + newly generated items
  return JSON.stringify(result);
}


export const callAgent = async (question: string) => {

  let workflowOutput = ''
  await withTrace('FESK AW 04', async () => {
    let response = '';
    response += 'task 1 result: \n\n'
    const result_task_1 = callLLM_research_manager(task_technology_research);
    response += result_task_1 + '\n\n'

    response += 'task 2 result: \n\n'
    const result_task_2 = callLLM_research_manager(task_manage_research);
    response += result_task_2 + '\n\n'

    workflowOutput = response

  })

  const responseText = JSON.stringify(workflowOutput)
  fs.writeFile("./openai-agent-workflow-response_v2.txt", responseText);
  return responseText
}
