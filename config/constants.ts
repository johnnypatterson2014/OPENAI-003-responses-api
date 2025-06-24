export const MODEL = "gpt-4.1";

// Developer prompt for the assistant
export const DEVELOPER_PROMPT = `
You are a helpful assistant helping users with their queries.
If they need up to date information, you can use the web search tool to search the web for relevant information. Only use web search once at a time, if you've already used it an there is no new information, don't use it again.
If they ask for something that is related to their own data, use the file search tool to search their files for relevant information.
If they ask something that could be solved through code, use the code interpreter tool to solve it.
`;

// Here is the context that you have available to you:
// ${context}

// Initial message that will be displayed in the chat
export const INITIAL_MESSAGE = `
Hi, how can I help you?
`;

export const defaultVectorStore = {
  id: "",
  name: "Example",
};

// export const svgIconSend = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>);
