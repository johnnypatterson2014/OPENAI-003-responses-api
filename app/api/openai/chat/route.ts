import { NextResponse } from 'next/server';
import { ChatMessage } from '@/components/ChatMessageWrapper'
// import { NextApiRequest, NextApiResponse } from 'next'

export async function POST(request: Request) {
    console.log('Entered api/test... ');
    // const requestBodyJson = JSON.stringify(req.body);
    // const data = await req.json();
    const { content, role, model, temperature, previousResponseId, websearchEnabled, vectorStoreId, mcpServerLabel, mcpServerUrl } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY
    // const url = 'http://localhost:8080/rag/qa-over-pdf' 
    const url = 'https://api.openai.com/v1/responses'

    // "tools": [{ "type": "web_search_preview" }],

    // "tools": [{
    //   "type": "file_search",
    //   "vector_store_ids": ["vs_1234567890"],
    //   "max_num_results": 20
    // }],

    let bodyContent = '';
    if (mcpServerLabel) {
        bodyContent = JSON.stringify({
            model: model,
            input: content,
            tools: [
                {
                    type: 'mcp',
                    server_label: mcpServerLabel,
                    server_url: mcpServerUrl,
                    require_approval: 'never'
                }
            ],
            previous_response_id: previousResponseId ? previousResponseId : null
        });
    } else if (vectorStoreId) {
        bodyContent = JSON.stringify({
            model: model,
            input: content,
            tools: [
                {
                    type: 'file_search',
                    vector_store_ids: [vectorStoreId],
                    max_num_results: 20
                }
            ],
            previous_response_id: previousResponseId ? previousResponseId : null
        });
    } else if (websearchEnabled == true) {
        bodyContent = JSON.stringify({
            model: model,
            input: content,
            tools: [
                {
                    type: 'web_search_preview'
                }
            ],
            previous_response_id: previousResponseId ? previousResponseId : null
        });
    } else {
        bodyContent = JSON.stringify({
            model: model,
            input: [
                {
                    role: role,
                    content: content,
                }
            ],
            previous_response_id: previousResponseId ? previousResponseId : null
        });
    }

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: bodyContent,
        })
        const data = await response.json()
        // res.status(200).json({ data })
        return NextResponse.json(data);
    } catch (error) {
        // TODO - log error
    }


    // return NextResponse.json({
    //     role: 'assistant',
    //     content: question
    // });
    // const response = await fetch('https://api.example.com/data');
    // const data = await response.json();
    // res.status(200).json(data);
}