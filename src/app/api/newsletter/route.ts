import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'newsletter-subscribers.json')

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Ensure data directory exists
    const dir = path.dirname(SUBSCRIBERS_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // Load existing subscribers
    let subscribers: { email: string; date: string }[] = []
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      subscribers = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf8'))
    }

    // Check for duplicate
    if (subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
    }

    // Add subscriber
    subscribers.push({ email: email.toLowerCase(), date: new Date().toISOString() })
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))

    return NextResponse.json({ message: 'Subscribed' }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
