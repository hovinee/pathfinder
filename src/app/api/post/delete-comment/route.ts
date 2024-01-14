import { NextRequest } from 'next/server'
import { deleteComment } from '@/controllers/feedController'

export async function POST(req: NextRequest) {
  return deleteComment(req)
}
