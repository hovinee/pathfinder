import { verifyUser } from '@/controllers/userController'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  return verifyUser(req)
}
