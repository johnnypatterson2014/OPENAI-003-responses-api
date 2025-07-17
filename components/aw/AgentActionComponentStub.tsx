'use client';

import { ReactNode } from 'react'
import TreeDrawer from '@/components/aw/TreeDrawer'
import FeskButtonDropdownGraph from '@/components/FeskButtonDropdownGraph'
import { TraceTreeItem, TraceTimeTreeItem } from '@/config/FeskConstants'
import FeskModal from '@/components/FeskModal'
import FeskDrawerGraph2 from '@/components/FeskDrawerGraph2'
import { useState } from 'react'
import { JsonData, AgentAction, TaskExecution, Workflow } from '@/components/aw/Constants';
import Button2 from '@/components/aw/Button2';

export default function AgentActionComponentStub({ name }: { name: string }) {

    return (
        <>
            <div className='flex flex-row content-center items-start'>

                <div className='flex-none'>
                    <div className='pl-[10px] pt-[5px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="m210.83 178.83l-48 48a4 4 0 0 1-5.66-5.66L198.34 180H64a4 4 0 0 1-4-4V32a4 4 0 0 1 8 0v140h130.34l-41.17-41.17a4 4 0 1 1 5.66-5.66l48 48a4 4 0 0 1 0 5.66Z" /></svg>
                    </div>
                </div>

                <div className='flex-1'>

                    <div className='flex flex-row aw-tree-item-mt text-blue-300' >

                        {name}

                    </div>

                </div>

            </div>

        </>
    );

}