'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import CSLabel from '@/components/ui/label/CSLabel'
import CSText from '@/components/ui/text/CSText'
import CSInput from '@/components/ui/input/CSInput'
import Section from '@/components/ui/section/Section'
import CSButton from '@/components/ui/button/CSButton'
import dynamic from 'next/dynamic'

const Loading = dynamic(() => import('../../loading/Loading'), {
  ssr: false,
})

const SignInForm = () => {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [watchEnabled, setWatchEnabled] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res?.error) {
        setLoading(false)
        setError('올바른 비밀번호를 입력해주세요')
        return
      } else if (res?.ok) {
        setLoading(false)
        alert('로그인 되었습니다.')
        router.replace('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Section className="m-auto w-[35rem] rounded-2xl border py-[2rem] xl:mx-0 xl:my-auto xl:ml-[15rem]">
      <CSText
        size="24"
        weight="bold"
        color="white"
        className="font-inter text-center"
      >
        로그인
      </CSText>
      <form onSubmit={handleSumit} className="flex flex-col">
        <CSInput
          type="text"
          setValue={setEmail}
          className="mt-[4.7rem] pl-[1rem]"
          placeholder="이메일"
          rounded="10"
        />

        <CSLabel className="mt-[2.7rem]">
          <CSInput
            type="password"
            setValue={setPassword}
            watchEnabled={watchEnabled}
            placeholder="비밀번호"
            rounded="10"
            className="pl-[1rem]"
          />
          <Image
            src={`/images/eye-${watchEnabled ? 'open' : 'close'}.png`}
            className="absolute right-[1.3rem] top-1/2 h-auto w-[1.5rem] -translate-y-1/2"
            width={0}
            height={0}
            alt={`eye-${watchEnabled ? 'open' : 'close'}`}
            onClick={() => setWatchEnabled(!watchEnabled)}
          />
        </CSLabel>
        <div className="mt-[0.9rem] flex justify-between">
          <CSText
            size="11"
            weight="normal"
            color={'red'}
            className="font-inter"
          >
            {error ? error : ''}
          </CSText>

          <CSText size="12" weight="normal" color="8B8B8B">
            비밀번호 찾기
          </CSText>
        </div>
        <CSButton
          className="mt-[2.2rem]"
          height="50"
          bgColor="999899"
          size="18"
          color="white"
          rounded="13"
        >
          로그인
        </CSButton>

        <Link
          className="mt-[2.5rem] text-right text-sm"
          href={'/auth/register'}
        >
          <CSText
            size="12"
            weight="normal"
            color="white"
            className="text-center"
          >
            회원이 아니신가요?
            <span className="underline">회원가입</span>
          </CSText>
        </Link>
      </form>
      {loading && <Loading />}
    </Section>
  )
}
export default SignInForm
