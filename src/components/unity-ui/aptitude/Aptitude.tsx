'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import clsx from 'clsx'
import { motion, useAnimation } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect } from 'react'

interface TProps {
  tutorialStep: number
}

const Aptitude = ({ tutorialStep }: TProps) => {
  const controls = useAnimation()

  useEffect(() => {
    const intervalId = setInterval(() => {
      controls.start({
        scale: [1, 1.2, 1], // 시작, 중간, 끝 스케일 값 설정
        transition: {
          duration: 1, // 애니메이션 지속 시간 (1초)
        },
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [controls])

  return (
    <div className="absolute left-[3rem] top-[25rem]">
      <div
        className={clsx(
          'relative w-[5.2rem] cursor-pointer',
          tutorialStep === 14 && 'z-10',
        )}
        onClick={() =>
          window.open(
            'https://chat.openai.com/g/g-WuMyoPNMV-ducogen-career-counselor',
          )
        }
      >
        <AutoSizeImage src={'/images/unity/aptitude.png'} full />
        {tutorialStep === 14 && (
          <>
            <motion.div
              className={clsx('absolute right-[-5rem] top-[3rem] w-[7rem]')}
              animate={controls}
            >
              <img
                src="/images/unity/finger_up.png"
                alt="Finger"
                className="h-full w-full"
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export default Aptitude
