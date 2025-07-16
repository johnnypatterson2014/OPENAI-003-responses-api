


export const OPENAI_MODEL = "gpt-4.1";
export const OPENAI_TEMPERATURE = '1';

export const DEVELOPER_PROMPT = `You are a helpful assistant helping users with their queries.
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

export interface TraceTreeItem {
    trace_id: string
    name?: string
    agent_name?: string
    input?: string
    output?: string
    child_ids?: string[]
    parent_id?: string
    children?: TraceTreeItem[]
    traceBody?: any
}

export interface TraceTimeTreeItem {
    trace_id: string
    name: string
    start_time: number
    end_time: number
    parent_trace_id?: string
    children?: TraceTimeTreeItem[]
}

// new Date(milliseconds)
// const events = [
//   { name: 'Event C', date: new Date('2023-07-05') },
//   { name: 'Event A', date: new Date('2021-01-15') },
//   { name: 'Event B', date: new Date('2022-12-25') }
// ];

// events.sort((a, b) => a.date.getTime() - b.date.getTime());

export const SVG_ICON_LOAD = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm9 4.094l-.719.687l-6 6l1.438 1.438L16 13.937l5.281 5.282l1.438-1.438l-6-6z" /></svg>);
export const SVG_ICON_EDIT = (<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z" /><path fill="currentColor" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z" /></svg>);
export const SVG_ICON_SEND = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>);
export const SVG_ICON_REPLY = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8ec5ff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>);
export const SVG_ICON_REQ_DEV = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7bf1a8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>);
export const SVG_ICON_REQ_USER = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffdf20" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>);


export const crewai_testrun_1 =
    [
        {
            id: 'f056bb6a-d18b-441e-91eb-cdb842154e86',
            name: 'Task 1',
            assigned_agent: 'Online Researcher'
        },
        {
            id: 'b4e0910e-5ebf-428c-ba3b-6a3c703d8801',
            name: 'Task 1 - subtask A',
            assigned_agent: 'Online Researcher'
        },
        {
            id: 'ee782498-586b-4b4c-9d70-9d313041ccc2',
            name: 'Task 1 - subtask B',
            assigned_agent: 'Blog Manager'
        },
        {
            id: '38751a67-b4f8-4678-b230-1cf27028e773',
            name: 'Task 2',
            assigned_agent: 'Blog Manager'
        },
        {
            id: '5fc8a385-8a52-4c15-a907-eb73c905cff1',
            name: 'Task 3',
            assigned_agent: 'Social Media Manager'
        },
        {
            id: '59ec4c91-2d01-4baa-988d-602270f06151',
            name: 'Task 4',
            assigned_agent: 'Content Marketing Manager'
        },
        {
            id: 'f690f409-5236-4aab-a0b3-c07914e67940',
            name: 'Task 4 - subtask A',
            assigned_agent: 'Content Marketing Manager'
        }
    ]


//   
//   
//   
//   
//   
//   
//   


export const crewai_testrun_2 =
    [
        {
            id: '0fcb32ee-2074-4aba-ad29-004e3893188f'
        },
        {
            id: '5f6303fc-a3a3-4223-b80d-d7cad849a6c3'
        },
        {
            id: '1eceeaa6-c83d-4465-9b79-d93d34f1afe2'
        },
        {
            id: 'a6e992be-cc76-42a8-a3ec-bfe7134ff65b'
        },
        {
            id: 'a252aaef-e1c1-44e9-8fde-25f108212b2b'
        },
        {
            id: '2bd808c5-1ea5-4cdf-80e5-80dc81f24ada'
        },
        {
            id: '8552ffc7-cb1f-4b37-83cf-94f0688caec1'
        },
        {
            id: 'ed5f65ab-d997-43ab-943e-70d5a65f723a'
        }

    ]