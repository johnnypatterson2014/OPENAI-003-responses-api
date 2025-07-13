'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";
import { chatMessages } from '@/components/ChatMessageWrapper'
import FeskButton3 from '@/components/FeskButton3'
import FeskGraphNode from '@/components/FeskGraphNode'
import { TraceTreeItem, TraceTimeTreeItem } from '@/config/FeskConstants'
import FeskDrawer from '@/components/FeskDrawer';
import FeskDrawerGraph from '@/components/FeskDrawerGraph';
import FeskModal from '@/components/FeskModal'
import JsonResponseObject from '@/components/JsonResponseObject'
import { text } from 'stream/consumers';
import { useState } from 'react'

export default function FeskTraceGraph({ traceTimeTree, traceList, displayName }: { traceTimeTree: TraceTimeTreeItem[], traceList: any[], displayName: string }) {


  // export interface TraceTimeTreeItem {
  //     trace_id: string
  //     name: string
  //     start_time: number
  //     end_time: number
  //     parent_trace_id?: string
  //     children?: TraceTimeTreeItem[]
  // }

  const rootNode = traceTimeTree[0]

  return (
    <>

      <div className="collapse">
        <input id='collapse-checkbox' type="checkbox" />
        <div className="collapse-title">

          <div className="fesk-collapse-title-graph">
            <div className="p-[0px] pb-[5px]">
              <FeskButton3>
                {displayName}
              </FeskButton3>
            </div>

          </div>
        </div>

        <div className="collapse-content">
          <div className="p-[5px] m-[0px]">

            <div className="fesk-collapse-graph-content flex ">


              <div className="flex-1 pt-[5px]">

                {rootNode.children?.map((child, i) => {
                  const foundItem = traceList.find(item => item.id === child.trace_id);
                  return (

                    <div key={`${rootNode.trace_id}-child-${i}`} >
                      <div className='mb-[8px]'>
                        <div className='flex flex-row'>
                          <div className='flex-none pl-[10px] pt-[5px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="m210.83 178.83l-48 48a4 4 0 0 1-5.66-5.66L198.34 180H64a4 4 0 0 1-4-4V32a4 4 0 0 1 8 0v140h130.34l-41.17-41.17a4 4 0 1 1 5.66-5.66l48 48a4 4 0 0 1 0 5.66Z" /></svg>
                          </div>

                          <div className='m-[5px] fesk-item' >

                            <FeskGraphNode item={child} traceItem={foundItem} traceList={traceList} />

                          </div>
                        </div>
                      </div>

                    </div>

                  )


                }
                )
                }

                {/* {
                  rootNode && rootNode.children && (rootNode.children.length > 0) && (
                    <FeskGraphNode traceItem={rootNode.children[0]} traceList={traceList} />
                  )} */}

              </div>

            </div>

          </div>
        </div>
      </div>



    </>
  )
}