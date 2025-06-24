import { promises as fs } from 'fs';
import { ChatMessage, ChatMessageWrapper } from '@/components/ChatMessageWrapper';
import ChatHistory from '@/components/ChatHistory';
import FeskDrawer from '@/components/FeskDrawer';
import ChatForm from '@/components/ChatForm';
import ChatFormMcp from '@/components/ChatFormMcp';
import ChatFormRag from '@/components/ChatFormRag';
import FileSearchSetup from "@/components/file-search-setup";


const templateGeneric = await fs.readFile(process.cwd() + '/app/data/prompt.txt', 'utf8');
const messagesArrayStub = await fs.readFile(process.cwd() + '/app/data/messages.array.stub.json', 'utf8');
const llmResponseListStub = await fs.readFile(process.cwd() + '/app/data/llmResponseList.stub.json', 'utf8');

export default function Home() {
    return (
        <>

            <ChatMessageWrapper messagesArrayStub={messagesArrayStub} llmResponseListStub={llmResponseListStub}>

                <div className="grid grid-cols-2 gap-[15px] mb-[15px]">

                    <div className="ml-[15px] fesk-card">

                        <div className='fesk-h2'>chat prompt</div>

                        <div className="m-[10px]">

                            <div className="fesk-card-2">


                                <FeskDrawer name='Chat Prompt'>
                                    <ChatForm templateGeneric={templateGeneric} />
                                </FeskDrawer>

                                <FeskDrawer name='RAG'>
                                    <FileSearchSetup />
                                    <ChatFormRag />
                                </FeskDrawer>

                                <FeskDrawer name='MCP'>
                                    <ChatFormMcp />
                                </FeskDrawer>

                            </div>

                        </div>


                    </div>

                    <div className="fesk-card mr-[15px]">
                        <ChatHistory />
                    </div>

                </div>


            </ChatMessageWrapper>


        </>
    );
}
