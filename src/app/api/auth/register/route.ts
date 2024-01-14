import { registerUser } from '@/controllers/userController'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  return registerUser(req)
}
