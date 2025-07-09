import { NextResponse } from 'next/server';
// import { NextApiRequest, NextApiResponse } from 'next'

export async function GET(request: Request, { params }) {
    const { id } = await params;
    console.log('Entered /api/langsmith/trace/[id]...');
    // const requestBodyJson = JSON.stringify(req.body);
    // const data = await req.json();

    const apiKey = process.env.LANGSMITH_API_KEY
    // const url = 'http://localhost:8080/rag/qa-over-pdf' 
    const url = 'https://api.smith.langchain.com/runs/' + id;

    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': `${apiKey}`
            },
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