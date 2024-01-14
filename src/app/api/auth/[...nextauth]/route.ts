import NextAuth, { AuthOptions, Session, Awaitable } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { findUserByEmail } from '@/services/userService'
import { SessionUser } from '@/utils/types'
import Database from '@/utils/database'
import User from '@/models/user'

class AuthMgr {
  public static curUser: SessionUser
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials

        try {
          await Database.getInstance()
          const user = await User.findOne({ email })
          if (!user) {
            return null
          }

          const passwordMatch = await bcrypt.compare(password, user.password)

          if (!passwordMatch) {
            return null
          }
          const userObj = user.toObject()
          AuthMgr.curUser = {
            email: userObj.email,
            name: userObj.name,
          }
          return userObj
        } catch (error) {
          console.log('Error: ', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일(30 * 24 * 60 * 60 초), 세션 유효 기간
  },
  callbacks: {
    async session({ session, token }): Promise<Session> {
      session.user = AuthMgr.curUser
      if (!AuthMgr.curUser) {
        const userDoc = await findUserByEmail(token.email!)
        AuthMgr.curUser = {
          email: userDoc.email,
          name: userDoc.name,
        }
        session.user = AuthMgr.curUser
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
