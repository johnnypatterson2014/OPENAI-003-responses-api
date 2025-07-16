import { NextResponse, NextRequest } from 'next/server'
import { mySqlConnectionParams } from '@/config/FeskConstants'
import mysql from 'mysql2/promise';

export async function GET(request: NextRequest) {
    try {

        // 2. connect to database
        const connection = await mysql.createConnection(mySqlConnectionParams)

        // 3. create a query to fetch data
        // const get_exp_query = 'SELECT * FROM feskDb.TraceTree';
        const get_exp_query = 'select * from feskDb.TraceTree where id = "my trace tree 2"';
        ;
        let values: any[] = []

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