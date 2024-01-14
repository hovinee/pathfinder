import { NextRequest } from 'next/server'
import { createFeed } from '@/controllers/feedController'

export async function POST(req: NextRequest) {
  return createFeed(req)
}
