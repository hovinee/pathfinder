'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSText from '@/components/ui/text/CSText'
import clsx from 'clsx'
import { motion, useAnimation } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface TProps {
  tutorialTrainingStep: number
  setTutorialTrainingStep: Dispatch<SetStateAction<number>>
}

const CounselingHistory = ({
  tutorialTrainingStep,
  setTutorialTrainingStep,
}: TProps) => {
  const controls = useAnimation()
  const [openHistory, setOpenHistory] = useState<boolean>(false)
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
    <div className="absolute bottom-[4rem] left-[3rem]">
      <div className="flex h-[28rem] w-[40rem] flex-col overflow-auto rounded-[1rem] border-none bg-181818 px-[2rem] pt-[2rem] text-white outline-none">
        <CSText size="20" color="white" className="mt-[0.3rem]">
          상담일지
        </CSText>
        <textarea className="mt-[1rem] h-full w-full flex-1 resize-none bg-transparent outline-none" />
      </div>

      <div
        className={clsx(
          'relative mt-[1.5rem] w-[4.6rem] cursor-pointer',
          tutorialTrainingStep === 2 && 'z-10 cursor-pointer',
        )}
        onClick={() => setTutorialTrainingStep((num) => num + 1)}
      >
        <AutoSizeImage src="/images/unity/counseling_history.png" full />
        {tutorialTrainingStep === 2 && (
          <>
            <motion.div
              className={clsx('absolute right-[-5rem] top-[-6.5rem] w-[7rem]')}
              animate={controls}
            >
              <img
                src="/images/unity/finger.png"
                alt="Finger"
                className="h-full w-full"
              />
            </motion.div>
            <div className="absolute right-[-35rem] top-[-13rem] w-[28rem] rounded-xl border border-[#E1792D] bg-white p-[2rem] text-18 font-bold">
              나의 상담일지를 적을 수 있습니다. 상담 슈퍼바이저에게 확인
              받아보세요!
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CounselingHistory
