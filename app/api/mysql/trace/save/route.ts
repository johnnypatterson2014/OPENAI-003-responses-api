import { NextResponse, NextRequest } from 'next/server'
import { mySqlConnectionParams } from '@/config/FeskConstants'
import mysql from 'mysql2/promise';
import { ChatHistory } from '@/components/ChatMessageWrapper'

export async function POST(request: NextRequest) {
    const data: any = await request.json();

    try {

        // 2. connect to database
        const connection = await mysql.createConnection(mySqlConnectionParams)

        // 3. create a query 
        let get_exp_query = 'INSERT INTO LangsmithTraces VALUES (?, ?, ?)';
        let values: any[] = [data.id, data.name, JSON.stringify(data.traceBody)]

        // 4. exec the query and retrieve the results
        const [results] = await connection.execute(get_exp_query, values)

        // 5. close the connection when done
        connection.end()

        // return the results as a JSON API response

        return NextResponse.json({ results })
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message)

        const response = {
            error: (err as Error).message,

            returnedStatus: 500,
        }

        return NextResponse.json(response, { status: 200 })
    }

}