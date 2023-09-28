import { NextResponse, type NextRequest } from 'next/server'

const API_URL = process.env.API_URL

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

        if(!res.ok) {
            throw new Error(data)
        }

        return NextResponse.json({ data })

    } catch(error) {
        throw error
    }
}