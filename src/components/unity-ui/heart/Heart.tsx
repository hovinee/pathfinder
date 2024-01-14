'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSText from '@/components/ui/text/CSText'
import clsx from 'clsx'
import { motion, useAnimation } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface TProps {
  setTutorialStep: Dispatch<SetStateAction<number>>
  tutorialStep: number
  sendToHeart: () => void
}

const Heart = ({ setTutorialStep, tutorialStep, sendToHeart }: TProps) => {
  const controls = useAnimation()
  const [count, setCount] = useState<number>(0)

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

  const heartControls = useAnimation()

  const handleClick = () => {
    tutorialStep === 10 && setTutorialStep((num) => num + 1)
    sendToHeart()
    // 애니메이션 시작
    heartControls.start({
      y: [-50, -100, -150], // 여러 위치로 이동
      opacity: [1, 0], // 페이드 아웃
      transition: {
        duration: 1, // 애니메이션 지속 시간
        ease: 'easeOut', // 이징 함수
      },
    })
  }
  return (
    <>
      <div className="absolute left-[30%] top-[45%]">
        <div
          className={clsx(
            'relative w-[5.2rem] cursor-pointer',
            tutorialStep === 10 && 'z-10',
          )}
          onClick={() => setCount((num) => num + 1)}
        >
          <div className="flex flex-col items-center">
            <motion.div
              whileTap={{ scale: 1.2 }}
              onClick={handleClick}
              style={{ position: 'relative', top: 0, left: 0 }}
            >
              {/* 하트 이미지 */}
              <img
                src="/images/unity/heart.png"
                alt="heart"
                style={{ width: '100%', height: '100%' }}
              />
              <motion.div
                animate={heartControls}
                style={{ position: 'absolute', top: 0, left: 0 }}
              >
                <img
                  src="/images/unity/heart.png"
                  alt="heart"
                  style={{ width: '100%', height: '100%' }}
                />
              </motion.div>
            </motion.div>
            {/* 날아가는 하트들 */}
            <CSText size="16" color="white">
              {count}
            </CSText>
          </div>
          {tutorialStep === 10 && (
            <>
              <motion.div
                className={clsx(
                  'absolute right-[-5rem] top-[-6.5rem] w-[7rem]',
                )}
                animate={controls}
              >
                <img
                  src="/images/unity/finger.png"
                  alt="Finger"
                  className="h-full w-full"
                />
              </motion.div>
              <div className="absolute right-[-35rem] top-[-13rem] w-[28rem] rounded-xl border border-[#E1792D] bg-white p-[2rem] text-18 font-bold">
                좋아요를 클릭하면 AI 상담사 나리가 기뻐합니다!
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Heart
