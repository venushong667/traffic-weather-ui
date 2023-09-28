import { NextResponse, type NextRequest } from 'next/server'

const API_URL = process.env.API_URL

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = '?' + searchParams.toString()
    
    const res = await fetch(`${API_URL}/traffic` + query, {
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 600 }, // Revalidate every 600 seconds
    })
    const data = await res.json()
 
    return NextResponse.json({ data })
}