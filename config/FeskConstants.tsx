


export const OPENAI_MODEL = "gpt-4.1";
export const OPENAI_TEMPERATURE = '1';

export const DEVELOPER_PROMPT = `
You are a helpful assistant helping users with their queries.
If they need up to date information, you can use the web search tool to search the web for relevant information. Only use web search once at a time, if you've already used it and there is no new information, don't use it again.
If they ask for something that is related to their own data, use the file search tool to search their files for relevant information.
If they ask something that could be solved through code, use the code interpreter tool to solve it.
`;

export const mySqlConnectionParams = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'feskMysqlDB',
    database: 'feskDb'
}

export const SVG_ICON_LOAD = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm9 4.094l-.719.687l-6 6l1.438 1.438L16 13.937l5.281 5.282l1.438-1.438l-6-6z" /></svg>);
export const SVG_ICON_EDIT = (<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z" /><path fill="currentColor" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z" /></svg>);
export const SVG_ICON_SEND = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>);
export const SVG_ICON_REPLY = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8ec5ff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>);
export const SVG_ICON_REQ_DEV = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7bf1a8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>);
export const SVG_ICON_REQ_USER = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffdf20" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>);