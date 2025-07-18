'use client';

import { WorkflowTreeNode } from '@/components/aw/Constants';
import Button2 from '@/components/aw/Button2'
import TreeDrawer from '@/components/aw/TreeDrawer'
import WorkflowTreeNodeUI from '@/components/aw/WorkflowTreeNodeUI'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

export default function WorkflowTreeNodeUIWithChildren({ currentNode }: { currentNode: WorkflowTreeNode }) {

    return (
        <>
            <div key={currentNode.id} className='flex flex-row content-center items-start'>

                <div className='flex-none'>
                    <div className='pl-[10px] pt-[5px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="m210.83 178.83l-48 48a4 4 0 0 1-5.66-5.66L198.34 180H64a4 4 0 0 1-4-4V32a4 4 0 0 1 8 0v140h130.34l-41.17-41.17a4 4 0 1 1 5.66-5.66l48 48a4 4 0 0 1 0 5.66Z" /></svg>
                    </div>
                </div>

                <div className='flex-1'>

                    <TreeDrawer id={currentNode.id} displayName={currentNode.name} isButton={currentNode.isButton} >

                        {currentNode.children && currentNode.children.map((n, i) => {
                            return (
                                <div key={n.id}>


                                    {n.children && n.children.map((node, i) => {

                                        return (
                                            <>

                                                <WorkflowTreeNodeUIWithChildren currentNode={n} />

                                            </>
                                        )
                                    })}

                                    {
                                        !n.children && (

                                            <WorkflowTreeNodeUI node={n} />

                                        )
                                    }


                                </div>
                            )

                        })}

                    </TreeDrawer>
                </div>

            </div>


        </>
    )

}