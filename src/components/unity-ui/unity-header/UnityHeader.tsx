'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSText from '@/components/ui/text/CSText'
import clsx from 'clsx'
import { motion, useAnimation } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect } from 'react'

interface TProps {
  goToLobby: () => void
  tutorialStep: number
  setTutorialStep: Dispatch<SetStateAction<number>>
  tutorialTrainingStep: number
  setTutorialTrainingStep: Dispatch<SetStateAction<number>>
  path: string
}

const UnityHeader = ({
  goToLobby,
  tutorialStep,
  setTutorialStep,
  path,
  tutorialTrainingStep,
  setTutorialTrainingStep,
}: TProps) => {
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
    <div
      className="absolute left-[3rem] top-[3rem]"
      onClick={() => {
        if (path === 'client' && tutorialStep === 12) {
          setTutorialStep(100)
        } else if (path === 'trainer' && tutorialTrainingStep === 3) {
          setTutorialTrainingStep(100)
        } else {
          goToLobby()
        }
      }}
    >
      <div
        className={clsx(
          'relative w-[4.6rem] cursor-pointer',
          path === 'client' && tutorialStep === 12 && 'z-10',
          path === 'trainer' && tutorialTrainingStep === 3 && 'z-10',
        )}
      >
        <AutoSizeImage src="/images/unity/exit.png" full />

        {(path === 'client' && tutorialStep === 12) ||
          (path === 'trainer' && tutorialTrainingStep === 3 && (
            <>
              <motion.div
                className={clsx('absolute right-[-5rem] top-[3.5rem] w-[7rem]')}
                animate={controls}
              >
                <img
                  src="/images/unity/finger_up.png"
                  alt="Finger"
                  className="h-full w-full"
                />
              </motion.div>
              <div className="absolute bottom-[-15rem] right-[-35rem] w-[28rem] rounded-xl border border-[#E1792D] bg-white px-[1rem] py-[2rem]">
                <CSText size="18" weight="bold" color="black">
                  나가기 버튼을 누르면 다시 로비로 이동합니다.
                </CSText>
              </div>
            </>
          ))}
      </div>
    </div>
  )
}

export default UnityHeader
