import { getAllFeed } from '@/controllers/feedController'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  return getAllFeed(req)
}
