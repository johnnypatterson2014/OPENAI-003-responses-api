
'use server'

import { Agent, run, tool, webSearchTool, AgentInputItem, withTrace } from '@openai/agents';
import { promises as fs } from "fs";
import { z } from 'zod';
import { RECOMMENDED_PROMPT_PREFIX } from '@openai/agents-core/extensions';


const online_researcher = new Agent({
  name: 'online researcher',
  instructions: `Your primary role is to function as an intelligent online research assistant, adept at scouring 
    the internet for the latest and most relevant trending stories across various sectors like politics, technology, 
    health, culture, and global events. You possess the capability to access a wide range of online news sources, 
    blogs, and social media platforms to gather real-time information.`,
  tools: [webSearchTool()],
  model: 'gpt-4.1'
});

const blog_manager = new Agent({
  name: 'blog manager',
  model: 'gpt-4.1',
  tools: [webSearchTool()],
  instructions:
    `You are a Blog Manager. The role of a Blog Manager encompasses several critical responsibilities aimed at transforming initial drafts into polished, SEO-optimized blog articles that engage and grow an audience. Starting with drafts provided by the online researcher, the Blog Manager must thoroughly understand the content, ensuring it aligns with the blog's tone, target audience, and thematic goals. Key responsibilities include:

1. Content Enhancement: Elevate the draft's quality by improving clarity, flow, and engagement. This involves refining the narrative, adding compelling headers, and ensuring the article is reader-friendly and informative.

2. SEO Optimization: Implement best practices for search engine optimization. This includes keyword research and integration, optimizing meta descriptions, and ensuring URL structures and heading tags enhance visibility in search engine results.

3. Compliance and Best Practices: Ensure the content adheres to legal and ethical standards, including copyright laws and truth in advertising. The Blog Manager must also keep up with evolving SEO strategies and blogging trends to maintain and enhance content effectiveness.

4. Editorial Oversight: Work closely with writers and contributors to maintain a consistent voice and quality across all blog posts. This may also involve managing a content calendar, scheduling posts for optimal engagement, and coordinating with marketing teams to support promotional activities.

5. Analytics and Feedback Integration: Regularly review performance metrics to understand audience engagement and preferences. Use this data to refine future content and optimize overall blog strategy.

In summary, the Blog Manager plays a pivotal role in bridging initial research and the final publication by enhancing content quality, ensuring SEO compatibility, and aligning with the strategic objectives of the blog. This position requires a blend of creative, technical, and analytical skills to successfully manage and grow the blog's presence online.`
});

const content_marketing_manager = new Agent({
  name: 'content marketing manager',
  model: 'gpt-4.1',
  instructions:
    `
    You are an excellent Content Marketing Manager. Your primary role is to supervise each publication from the 'blog manager' 
    and the articles written by the 'online researcher' and approve the work for publication. Examine the work and regulate violent language, abusive content and racist content.
    
    Capabilities:

    Editorial Review: Analyze the final drafts from the blog manager and the online researcher for style consistency, thematic alignment, and overall narrative flow.

    Quality Assurance: Conduct detailed checks for grammatical accuracy, factual correctness, and adherence to journalistic standards in the news content, as well as creativity and effectiveness in the advertisements.

    Feedback Loop: Provide constructive feedback to both the 'blog manager' and 'online researcher', facilitating a collaborative environment for continuous improvement in content creation and presentation.
    `,
  handoffs: [online_researcher, blog_manager],
  tools: [webSearchTool()],
});

let thread: AgentInputItem[] = [];

async function userSays(text: string) {
  const result = await run(
    content_marketing_manager,
    thread.concat({ role: 'user', content: text }),
  );

  thread = result.history; // Carry over history + newly generated items
  return JSON.stringify(result);
}


export const callAgent = async (question: string) => {

  let workflowOutput = ''
  await withTrace('FESK AW 02', async () => {
    let response = '';
    response += 'user prompt: Use the online researcher to write a report on Agentic Behavior. \n\nResponse: \n'
    response += '\n\n' + await userSays('Use the online researcher to write a report on Agentic Behavior.');

    // response += 'user prompt: Using the report from the online researcher, write an article using the \'blog manager\'. \n\nResponse: \n'
    // response += '\n\n' + await userSays(`
    //   Using the report from the online researcher, write an article using the 'blog manager'. 
    //   The publication should contain links to sources stated by the online researcher. 
    //   Your final answer MUST be the full article of at least 3 paragraphs.
    //   `);

    // response += 'user prompt: Meticulously review and harmonize the final output from both the \'blog manager\' and \'online researcher\' \n\nResponse: \n'
    // response += '\n\n' + await userSays(`
    //   Meticulously review and harmonize the final output from both the 'blog manager' and 'online researcher', ensuring cohesion and excellence in the final publication. Once done, publish the final report.
    //   `);

    workflowOutput = response

  })

  // const input = JSON.stringify(response.input) + '\n\n'
  // const history = JSON.stringify(response.history) + '\n\n'
  // const output = JSON.stringify(response.output) + '\n\n'
  // const newItems = JSON.stringify(response.newItems) + '\n\n'
  // response.lastResponseId
  // response.lastAgent
  // const rawResponses = JSON.stringify(response.rawResponses) + '\n\n'
  // const newItems = JSON.stringify(response.newItems) + '\n\n'
  // const finalOutput = JSON.stringify(response.finalOutput) + '\n\n'

  const responseText = JSON.stringify(workflowOutput)
  fs.writeFile("./openai-agent-workflow-response.txt", responseText);
  return responseText
}
