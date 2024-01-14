import { NextRequest } from 'next/server'
import { updateCommentMsg } from '@/controllers/feedController'

export async function POST(req: NextRequest) {
  return updateCommentMsg(req)
}
