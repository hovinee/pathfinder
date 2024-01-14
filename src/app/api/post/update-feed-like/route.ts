import { NextRequest } from 'next/server'
import { updateFeedLike } from '@/controllers/feedController'

export async function POST(req: NextRequest) {
  return updateFeedLike(req)
}
