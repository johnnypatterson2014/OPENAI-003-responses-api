'use client';

// import ChatCompletionRequestMessage from 'openai'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { sendChatRequest } from '@/lib/sendChatRequest'
import { sendChatHistoryRequest } from '@/lib/sendChatHistoryRequest'
import { sendChatHistoryPersistenceRequest } from '@/lib/sendChatHistoryPersistenceRequest'
import { deleteChatHistorySession } from '@/lib/deleteChatHistorySession'
import { saveChatHistory } from '@/lib/saveChatHistory'
import { remark } from 'remark';
import html from 'remark-html';
import { timeStamp } from 'console';


export default function CrewaiTraceWrapper() {


  return (
    <>

    </>
  )
}

