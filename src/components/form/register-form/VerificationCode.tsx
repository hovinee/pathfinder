import CSButton from '@/components/ui/button/CSButton'
import CSInput from '@/components/ui/input/CSInput'

import CSLabel from '@/components/ui/label/CSLabel'
import CSText from '@/components/ui/text/CSText'
import Timer from '@/hooks/use-timer'

import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  verificationCode: string
  setVerificationCode: Dispatch<SetStateAction<string>>
  verifiedCode: boolean
  onClick: () => void
}

const VerificationCode = ({
  verificationCode,
  setVerificationCode,
  verifiedCode,
  onClick,
}: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="verificationCode"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-[2.7rem]"
      >
        <div className="flex gap-[0.6rem]">
          <CSLabel className="flex-1">
            <CSInput
              type="text"
              setValue={setVerificationCode}
              disabled={verifiedCode}
              placeholder="인증번호"
              rounded="10"
              className="pl-[1rem]"
            />
            <div className="absolute right-[1.3rem] top-1/2 -translate-y-1/2">
              <Timer />
            </div>
          </CSLabel>
          <CSButton
            width="101"
            height="44"
            bgColor="00A886"
            color="white"
            rounded="13"
            onClick={onClick}
            disabled={verificationCode.length !== 4}
            type="button"
            size="14"
          >
            확인
          </CSButton>
        </div>
        {verifiedCode && (
          <CSText
            size="11"
            weight="normal"
            color="00A886"
            className="font-inter mt-[0.5rem]"
          >
            비밀번호가 확인되었습니다.
          </CSText>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default VerificationCode
