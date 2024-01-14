import { NextRequest } from 'next/server'
import { updateCommentLike } from '@/controllers/feedController'

export async function POST(req: NextRequest) {
  return updateCommentLike(req)
}
