import React from 'react'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import RegisterForm from '@/components/form/register-form/RegisterForm'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'

const Register = async () => {
  const session = await getServerSession(authOptions)
  if (session) redirect('/auth/userInfo')

  return (
    <div className="grid h-screen w-full lg:grid-cols-2">
      <div className="hidden lg:block">
        <AutoSizeImage
          src={'/images/unity/loading_bg_2.jpg'}
          full
          objectCover
        />
      </div>
      <RegisterForm />
    </div>
  )
}

export default Register
