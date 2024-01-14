'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import clsx from 'clsx'
import { motion, useAnimation } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ChooseCounselingModal from '../modal/ChooseCounselingModal'
import UnitySection from '../section/UnitySection'
import ChooseMoodModal from '../modal/ChooseMoodModal'
import CSText from '@/components/ui/text/CSText'
import { TTutorial } from '@/utils/types'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'

interface TProps {
  sendToGPT: (selectMesssage: string) => void
  setWantCounseling: Dispatch<SetStateAction<number>>
  setAiMsg: Dispatch<SetStateAction<string>>
  setChat: Dispatch<SetStateAction<TTutorial[]>>
  setTutorialStep: Dispatch<SetStateAction<number>>
  tutorialStep: number
  wantCounseling: number
  roomMood: (num: number) => void
  letsDance: () => void
  sendtoUnity: (
    gameObjectName: string,
    methodName: string,
    parameter?: ReactUnityEventParameter,
  ) => void
}

const Menu = ({
  sendToGPT,
  setWantCounseling,
  setAiMsg,
  tutorialStep,
  wantCounseling,
  setTutorialStep,
  roomMood,
  letsDance,
  setChat,
  sendtoUnity,
}: TProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [openMood, setOpenMood] = useState<boolean>(false)
  const [selectCounseling, setSelectCounseling] = useState<boolean>(false)

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
    <>
      <div className="absolute bottom-[4rem] left-[3rem]">
        <div className="flex items-center justify-center gap-[2.5rem]">
          <div
            className={clsx(
              'relative w-[4.6rem] cursor-pointer',
              tutorialStep === 5 && 'z-10 cursor-pointer',
            )}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <AutoSizeImage src="/images/unity/menu.png" full />
            {tutorialStep === 5 && (
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
                  상담 종류의 아이콘을 클릭하여 원하시는 상담을 선택해주세요.
                </div>
              </>
            )}
          </div>

          <div
            className={clsx(
              'relative w-[4.6rem] cursor-pointer',
              tutorialStep === 6 && 'z-10',
            )}
            onClick={() => setOpenMood(!openMood)}
          >
            <AutoSizeImage
              full
              className="h-[2.324rem] w-[2.8rem]"
              src="/images/unity/room.png"
            />

            {tutorialStep === 6 && (
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
                  방 분위기 아이콘을 눌러 방 분위기를 바꿀 수 있어요!
                </div>
              </>
            )}
          </div>
          <div
            className={clsx(
              'relative w-[4.6rem] cursor-pointer',
              tutorialStep === 7 && 'z-10',
            )}
            onClick={() => {
              if (tutorialStep === 7) {
                setTutorialStep((num) => num + 1)
                sendtoUnity('MessageReceiver', 'OnClickedButton', 'gpt_discard')
              } else {
                letsDance()
              }
            }}
          >
            <AutoSizeImage full src="/images/unity/dance.png" />

            {tutorialStep === 7 && (
              <>
                <motion.div
                  className={clsx(
                    'absolute right-[-5rem] top-[-6.5rem] w-[7rem] ',
                  )}
                  animate={controls}
                >
                  <img
                    src="/images/unity/finger.png"
                    alt="Finger"
                    className="h-full w-full"
                  />
                </motion.div>
                <div className="absolute right-[-35rem] top-[-13rem] grid h-[6rem] w-[28rem] place-items-center rounded-xl border border-[#E1792D] bg-white text-18 font-bold">
                  춤추기를 한 번 눌러보세요!
                </div>
              </>
            )}
          </div>
          <div
            className={clsx(
              'relative w-[4.6rem] cursor-pointer',
              tutorialStep === 8 && 'z-10',
            )}
            onClick={() => {
              if (tutorialStep === 8) {
                setTutorialStep((num) => num + 1)
              } else {
                window.open(
                  'https://chat.openai.com/g/g-WuMyoPNMV-ducogen-career-counselor',
                )
              }
            }}
          >
            <AutoSizeImage full src="/images/unity/aptitude.png" />

            {tutorialStep === 8 && (
              <>
                <motion.div
                  className={clsx(
                    'absolute right-[-5rem] top-[-6.5rem] w-[7rem] ',
                  )}
                  animate={controls}
                >
                  <img
                    src="/images/unity/finger.png"
                    alt="Finger"
                    className="h-full w-full"
                  />
                </motion.div>
                <div className="absolute right-[-35rem] top-[-13rem] w-[28rem] rounded-xl border border-[#E1792D] bg-white px-[1rem] pb-[2rem]">
                  <CSText
                    size="18"
                    weight="bold"
                    color="black"
                    className="mt-[1rem] text-center"
                  >
                    클릭시 홀랜드 검사 페이지로 이동합니다.
                  </CSText>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {openMenu && (
        <UnitySection>
          <ChooseCounselingModal
            setWantCounseling={setWantCounseling}
            wantCounseling={wantCounseling}
            setSelectCounseling={setSelectCounseling}
            setOpenMenu={setOpenMenu}
            setTutorialStep={setTutorialStep}
            tutorialStep={tutorialStep}
            sendToGPT={sendToGPT}
            setChat={setChat}
            sendtoUnity={sendtoUnity}
          />
        </UnitySection>
      )}
      {openMood && (
        <UnitySection>
          <ChooseMoodModal
            setTutorialStep={setTutorialStep}
            tutorialStep={tutorialStep}
            setOpenMood={setOpenMood}
            roomMood={roomMood}
            sendtoUnity={sendtoUnity}
          />
        </UnitySection>
      )}
    </>
  )
}

export default Menu
