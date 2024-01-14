'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import Agreement from './Agreement'
import dynamic from 'next/dynamic'

import CSText from '@/components/ui/text/CSText'
import CSLabel from '@/components/ui/label/CSLabel'
import CSInput from '@/components/ui/input/CSInput'
import { UserModel } from '@/models/user'
import Section from '@/components/ui/section/Section'
import { Agreements } from '@/utils/types'
import { validateEmail, validatePassword } from '@/utils/validation_front'
import VerificationCode from './VerificationCode'
import { postRegister, postValidationCode, postVerify } from '@/app/api/auth'
import CSButton from '@/components/ui/button/CSButton'

const Loading = dynamic(() => import('../../loading/Loading'), {
  ssr: false,
})

const SignUpForm = () => {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordCheck, setPasswordCheck] = useState<string>('')

  const [watchEnabled, setWatchEnabled] = useState<boolean>(false)
  const [verficationEnabled, setVerficationEnabled] = useState<boolean>(false)
  const [verifiedCode, setVerifiedCode] = useState<boolean>(false)
  const [alreadyVerifiedCode, setAlreadyVerifiedCode] = useState<boolean>(false)

  //동의
  const [agreements, setAgreements] = useState<Agreements>({
    allAgreements: false,
    over14: false,
    serviceTerms: false,
    privacyPolicy: false,
  })

  //로딩
  const [loading, setLoading] = useState<boolean>(false)

  const handleVerificationCode = async () => {
    const res = await postValidationCode(email)
    const data = await res.json()

    if (data.result === 1200) {
      setAlreadyVerifiedCode(true)
    } else if (data.result === 1000) {
      setVerficationEnabled(true)
    }
  }

  const handleVerify = async () => {
    //TODO: try catch 문으로 로직 수정
    const res = await postVerify(email, verificationCode)
    const data = await res.json()
    if (data.result === 1000) {
      setVerifiedCode(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !name ||
      validateEmail(email).error ||
      validatePassword(password).error ||
      verifiedCode == false ||
      password !== passwordCheck
    )
      return alert('회원가입 정보를 확인해주세요')

    if (
      !agreements.over14 ||
      !agreements.privacyPolicy ||
      !agreements.serviceTerms
    )
      return alert('서비스 이용약관 및 개인정보 수집에 동의해주세요')

    try {
      setLoading(true)
      const newUser: UserModel = {
        email: email,
        name: name,

        password: password,
      }

      const res = await postRegister(newUser)

      if (res.ok) {
        const form = e.target as HTMLFormElement
        form.reset()
        router.push('/')
        setLoading(false)
      } else {
        setLoading(false)
        console.log('User registration failed.')
      }
    } catch (error) {
      console.log('Error during registration', error)
      setLoading(false)
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
        회원가입
      </CSText>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <CSInput
          type="text"
          setValue={setName}
          placeholder="이름"
          className="mt-[4.7rem] pl-[1rem]"
          rounded="10"
        />

        <CSLabel className="mt-[2.7rem]">
          <CSInput
            type="text"
            setValue={setEmail}
            disabled={verifiedCode}
            placeholder="이메일"
            rounded="10"
            className="pl-[1rem]"
          />
          <CSText
            size="14"
            weight="bold"
            color="00A886"
            className="absolute right-[1.3rem] top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={handleVerificationCode}
          >
            {verficationEnabled ? '재전송' : '인증'}
          </CSText>
        </CSLabel>
        {email && validateEmail(email).error && (
          <CSText
            size="11"
            weight="normal"
            color="00A886"
            className="font-inter mt-[0.5rem]"
          >
            올바른 이메일 형식을 입력해주세요.
          </CSText>
        )}

        {alreadyVerifiedCode && (
          <CSText
            size="11"
            weight="normal"
            color="red"
            className="font-inter mt-[0.5rem]"
          >
            이미 인증하신 이메일 주소 입니다.
          </CSText>
        )}

        {verficationEnabled && (
          <VerificationCode
            setVerificationCode={setVerificationCode}
            verificationCode={verificationCode}
            verifiedCode={verifiedCode}
            onClick={handleVerify}
          />
        )}

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
        <CSText
          size="11"
          weight="normal"
          color={
            password && validatePassword(password).error ? 'red' : '00A886'
          }
          className="font-inter mt-[0.5rem]"
        >
          비밀번호는 8-20 이하의 영문+숫자 조합입니다.
        </CSText>

        <CSLabel className="mt-[2.7rem]">
          <CSInput
            type="password"
            setValue={setPasswordCheck}
            watchEnabled={watchEnabled}
            placeholder="비밀번호 확인"
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
        {password && password === passwordCheck && (
          <CSText
            size="11"
            weight="normal"
            color="00A886"
            className="font-inter mt-[0.5rem]"
          >
            인증번호가 확인되었습니다.
          </CSText>
        )}

        <Agreement setAgreements={setAgreements} agreements={agreements} />
        <CSButton
          className="mt-[2.2rem]"
          height="50"
          bgColor="00A886"
          size="18"
          color="white"
          rounded="13"
        >
          회원가입
        </CSButton>

        <Link className="mt-[1.7rem] text-center" href={'/auth/login'}>
          <CSText size="12" weight="normal" color="white">
            회원이 아니신가요?
            <span className="underline">로그인</span>
          </CSText>
        </Link>
      </form>
      {loading && <Loading />}
    </Section>
  )
}
export default SignUpForm
