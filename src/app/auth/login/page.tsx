import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import LoginForm from '@/components/form/login-form/LoginForm'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Login = async () => {
  const session = await getServerSession(authOptions)
  if (session) redirect('/')

  return (
    <div className="grid h-screen w-full lg:grid-cols-2">
      <div className="hidden lg:block">
        <AutoSizeImage
          src={'/images/unity/loading_bg_2.jpg'}
          full
          objectCover
        />
      </div>
      <LoginForm />
    </div>
  )
}

export default Login
