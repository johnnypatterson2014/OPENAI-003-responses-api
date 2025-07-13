'use client';

import { ReactNode } from 'react'
import { Input } from "@/components/ui/input";
import { chatMessages } from '@/components/ChatMessageWrapper'
import FeskButton3 from '@/components/FeskButton3'
import FeskGraphNode2 from '@/components/FeskGraphNode2'
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

        <div className="collapse-content mt-[5px] mb-[50px]">
          <div className="pt-[5px] pr-[5px] pl-[5px] pb-[50px] m-[0px]">

            <div className="fesk-collapse-graph-content flex ">


              <div className="flex-1 pt-[5px]">

                {rootNode.children?.map((child, i) => {
                  const foundItem = traceList.find(item => item.id === child.trace_id);
                  return (
                    <div key={`${rootNode.trace_id}-child-${i}`}>
                      <FeskGraphNode2 item={child} traceItem={foundItem} traceList={traceList} />
                    </div>

                  )


                }
                )
                }

                <br /><br /><br />

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