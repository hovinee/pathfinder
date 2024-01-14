import { NextRequest } from 'next/server'
import { createComment } from '@/controllers/feedController'

export async function POST(req: NextRequest) {
  return createComment(req)
}
