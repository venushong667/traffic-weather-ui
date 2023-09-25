import { NextResponse, type NextRequest } from 'next/server'

export const API_URL = 'http://localhost:8080'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const query = '?' + searchParams.toString()
        
        const res = await fetch(`${API_URL}/weather` + query, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await res.json()
        // ToDo: data return { statusCode: 500, message: 'Internal server error' } instead of throw error
        
        return NextResponse.json({ data })

    } catch(error) {
        console.log(error)
        throw error
    }
}