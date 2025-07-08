
'use server'

import { ChatOpenAI } from "@langchain/openai";


export const sendChatRequestTrace = async (question: string) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const openAIClient = new ChatOpenAI({
    apiKey: apiKey,
    model: "gpt-4.1",
    temperature: 1
  });

  // const systemMessage =
  //   "You are a helpful assistant.";

  // const response = await openAIClient.responses.create({
  //   model: "gpt-4o-mini",
  //   input: question
  // });

  const response = await openAIClient.invoke([
    {
      role: "system",
      content:
        "You are a helpful assistant.",
    },
    {
      role: "user",
      content: question,
    },
  ]);

  return JSON.stringify(response, null, 2)
  // return response;

}
