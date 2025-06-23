import { promises as fs } from 'fs';
import { ChatMessage, ChatMessageWrapper } from '@/components/ChatMessageWrapper';
import ChatHistory from '@/components/ChatHistory';
import ChatForm from '@/components/ChatForm';
import McpChatForm from '@/components/McpChatForm';
import { remark } from 'remark';
import html from 'remark-html';

const instructions = await fs.readFile(process.cwd() + '/app/data/prompt.txt', 'utf8');
const messagesArrayStub = await fs.readFile(process.cwd() + '/app/data/messages.array.stub.json', 'utf8');
const llmResponseListStub = await fs.readFile(process.cwd() + '/app/data/llmResponseList.stub.json', 'utf8');

export default function Home() {
    return (
        <>

            <ChatMessageWrapper messagesArrayStub={messagesArrayStub} llmResponseListStub={llmResponseListStub}>

                <div className="grid grid-cols-2 gap-[10px] mb-[10px]">

                    <div className="ml-[10px] fesk-card">

                        <div className='fesk-h2'>chat prompt</div>

                        <div className="m-[10px]">

                            <div className="fesk-card-2">


                                <div className="collapse">
                                    <input id='collapse-checkbox' type="checkbox" />
                                    <div className="collapse-title">

                                        <div className="fesk-collapse-title">
                                            <div className="p-[5px]">
                                                Chat Prompt
                                                <div className="float-right pr-[10px]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffffff" d="M12 6a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z" /></svg>
                                                </div>
                                            </div>

                                        </div>




                                    </div>
                                    <div className="collapse-content">
                                        <div className="p-[1px] m-[0px]">

                                            <div className="fesk-collapse-title-2">
                                                <div className="p-[10px]">

                                                    <ChatForm />
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>


                                <div>

                                    <div className="collapse">
                                        <input id='collapse-checkbox' type="checkbox" />
                                        <div className="collapse-title">

                                            <div className="fesk-collapse-title">
                                                <div className="p-[5px]">
                                                    MCP
                                                    <div className="float-right pr-[10px]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#ffffff" d="M12 6a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-8 8a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm8 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z" /></svg>
                                                    </div>
                                                </div>

                                            </div>




                                        </div>
                                        <div className="collapse-content">
                                            <div className="p-[1px] m-[2px]">

                                                <div className="fesk-collapse-title-2">
                                                    <div className="p-[10px]">

                                                        <McpChatForm />

                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>

                        </div>


                    </div>

                    <div className="fesk-card mr-[10px]">
                        <ChatHistory />
                    </div>

                </div>


            </ChatMessageWrapper>


        </>
    );
}
