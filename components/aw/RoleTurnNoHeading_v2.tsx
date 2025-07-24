'use client';

import { ReactNode } from 'react'
import FeskButtonDropdown from '@/components/FeskButtonDropdown';
import { workflowContext_v2 } from '@/components/aw/AgentWorkflowContext_v2';

export default function RoleTurnNoHeading_v2({ id, children }: { id: string, children: ReactNode }) {
    const { openaiResponses, workflowData, isContextLoaded, setSelectedTreeNode, workflowTreeData } = workflowContext_v2()

    const handleViewJson = async (id: string) => {
        console.log('id: ' + id);
        const foundItem = openaiResponses.find(item => item.id === id);
        const json = JSON.stringify(foundItem.body, null, 2);
        const myDiv = document.getElementById('json_response')
        myDiv.innerHTML = json;
        document.getElementById('modal_json_response').showModal()
    }

    const handleViewDetails = async (id: string) => {
        console.log('id: ' + id);
        const foundItem = workflowTreeData.find(item => item.id === id);
        setSelectedTreeNode(foundItem.body)
        document.getElementById('modal_full_details').showModal()
    }

    return (
        <>

            <div className='flex flex-row grow aw-roleturn-body aw-overflow-wrap'>
                <div className='flex-1'>
                    {children}
                </div>

                <div className='flex-none'>
                    <FeskButtonDropdown>

                        <ul tabIndex={0} className="dropdown-content text-xs fesk-menu menu bg-zinc-800 z-10 w-40 mt-[5px] mb-[2px] ml-[2px] mr-[2px] shadow-sm">
                            <li className='fesk-menu-li'><a onClick={() => handleViewDetails(id)}>view full details</a></li>
                            <li className='fesk-menu-li-bottom'><a onClick={() => handleViewJson(id)}>view raw json</a></li>
                        </ul>

                    </FeskButtonDropdown>
                </div>

            </div>




        </>
    );

}