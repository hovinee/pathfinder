'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSText from '@/components/ui/text/CSText'
import { TTutorial } from '@/utils/types'
import clsx from 'clsx'
import { motion, useAnimation } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect } from 'react'

interface TProps {
  tutorialStep: number
  setTutorialStep: Dispatch<SetStateAction<number>>
  tutorialTrainingStep: number
  setTutorialTrainingStep: Dispatch<SetStateAction<number>>
  chat: TTutorial[]
  path: string
}

const UserHistory = ({
  tutorialStep,
  setTutorialStep,
  chat,
  tutorialTrainingStep,
  setTutorialTrainingStep,
  path,
}: TProps) => {
  const userChat = chat.filter((item) => item.who === 'user')

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
      className={clsx(
        'absolute left-[3rem] top-[10rem]',
        path === 'client' && tutorialStep === 11 && 'z-10',
        path === 'trainer' && tutorialTrainingStep === 1 && 'z-10',
      )}
    >
      <div className="h-[42.1rem] w-[40rem] overflow-auto rounded-[1rem] bg-181818 px-[2rem] pt-[2rem] ">
        <div className="flex gap-[1.3rem] border-b border-b-[#2E3033] pb-[2rem]">
          <AutoSizeImage
            src={'/images/unity/nara_profile.png'}
            rounded="10"
            className={'h-[5.8rem] w-[5.8rem] '}
          />
          <div className="flex flex-col ">
            <CSText size="16" color="white">
              AI 상담사 나라
            </CSText>
            <CSText size="20" color="white" className="mt-[0.3rem]">
              일일 친구 상담소
            </CSText>
          </div>
        </div>
        <CSText size="20" color="white" className="mt-[0.3rem]">
          오늘의 상담일지
        </CSText>
        {userChat.map((history, index) => (
          <CSText
            size="16"
            color="white"
            className="mt-[0.3rem] line-clamp-2 border-b border-b-[#2E3033] py-[0.5rem]"
            key={index}
          >
            {history.text}
          </CSText>
        ))}
        {(path === 'client' && tutorialStep === 11) ||
          (path === 'trainer' && tutorialTrainingStep === 1 && (
            <>
              <motion.div
                className={clsx(
                  'absolute bottom-[-6.5rem] right-[-5rem] w-[7rem] cursor-pointer',
                )}
                animate={controls}
                onClick={() => {
                  // if (path === 'client') {
                  //   setTutorialStep((num) => num + 1)
                  // } else if (path === 'trainer') {
                  //   setTutorialTrainingStep((num) => num + 1)
                  // }
                }}
              >
                <img
                  src="/images/unity/finger_up.png"
                  alt="Finger"
                  className="h-full w-full"
                />
              </motion.div>
              <div className="absolute bottom-[-15rem] right-[-35rem] w-[28rem] rounded-xl border border-[#E1792D] bg-white px-[1rem] py-[2rem]">
                <CSText
                  size="18"
                  weight="bold"
                  color="black"
                  className="mt-[1rem]"
                >
                  상담 일지를 통해 나의 상담 내용을 파악할 수 있습니다.
                </CSText>
              </div>
            </>
          ))}
      </div>
    </div>
  )
}

export default UserHistory
