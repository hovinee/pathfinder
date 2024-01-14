import { NextRequest } from 'next/server'
import { updateFeedMsg } from '@/controllers/feedController'

export async function POST(req: NextRequest) {
  return updateFeedMsg(req)
}
