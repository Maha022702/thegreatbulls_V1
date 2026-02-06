import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{
    symbol: string
  }>
}

export async function GET(
  req: NextRequest,
  context: RouteParams
) {
  const { symbol } = await context.params
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
    )
    const data = await response.json()

    if (data['Global Quote']) {
      const quote = data['Global Quote']
      return NextResponse.json({
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: quote['10. change percent'],
      })
    } else {
      return NextResponse.json({ error: 'Symbol not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}