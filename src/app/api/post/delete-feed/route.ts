import { NextRequest } from 'next/server'
import { deleteFeed } from '@/controllers/feedController'

export async function POST(req: NextRequest) {
  return deleteFeed(req)
}
