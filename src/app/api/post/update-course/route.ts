import { updateCourse } from '@/controllers/courseController'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  return updateCourse(req)
}
