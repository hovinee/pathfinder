'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import './style.css'
import { AnimatePresence, motion } from 'framer-motion'
import ChooseCounselingModal from '../modal/ChooseCounselingModal'
import CSText from '@/components/ui/text/CSText'

interface TProps {
  setWantCounseling: Dispatch<SetStateAction<number>>
  wantCounseling: number
  aiMsg: string
  sendToGPT: () => void
}
const OneByOne = ({
  wantCounseling,
  setWantCounseling,
  sendToGPT,
  aiMsg,
}: TProps) => {
  const [selectCounseling, setSelectCounseling] = useState<boolean>(false)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots.length === 3 ? '.' : prevDots + '.'))
    }, 500)

    return () => clearInterval(intervalId) // 컴포넌트 언마운트 시 인터벌 클리어
  }, [])

  return (
    <>
      {selectCounseling ? (
        <div className="h-full w-full pl-[42.5rem] pt-[30rem]">
          <div className="relative w-[43rem]">
            <AutoSizeImage
              src="/images/unity/speech_bubble.png"
              rounded="10"
              className="h-[21.3rem] w-full"
            />
            <div className="absolute inset-y-0 left-0 right-8 p-[3rem] backdrop-blur-[0.1rem]">
              <CSText size="24" color="white">
                {dots}
              </CSText>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default OneByOne
