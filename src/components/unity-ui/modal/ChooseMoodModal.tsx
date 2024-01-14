'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSButton from '@/components/ui/button/CSButton'
import CSText from '@/components/ui/text/CSText'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'

interface TProps {
  setTutorialStep: Dispatch<SetStateAction<number>>
  setOpenMood: Dispatch<SetStateAction<boolean>>
  tutorialStep: number
  roomMood: (num: number) => void
  sendtoUnity: (
    gameObjectName: string,
    methodName: string,
    parameter?: ReactUnityEventParameter,
  ) => void
}

const ChooseMoodModal = ({
  setTutorialStep,
  tutorialStep,
  setOpenMood,
  roomMood,
  sendtoUnity,
}: TProps) => {
  const wantMoodData = [
    {
      title: '고요한 우주',
      image_url: '/images/unity/mood/want_mood_1.png',
    },
    {
      title: '신나는 롤러장',
      image_url: '/images/unity/mood/want_mood_2.png',
    },
    {
      title: '비오는 풍경',
      image_url: '/images/unity/mood/want_mood_3.png',
    },
  ]

  return (
    <div className="z-20 grid h-full w-full place-items-center">
      <div className="h-[25rem] w-[45rem] rounded-[1rem] bg-white/75 pt-[2rem]">
        <div className="flex flex-col items-center">
          <CSText size="24" color="black" weight="bold">
            원하는 방분위기를 선택해주세요
          </CSText>

          <div className="mt-[2.1rem] flex gap-[2.2rem]">
            {wantMoodData.map(({ title, image_url }, index) => (
              <div
                className="flex flex-col items-center gap-[2rem]"
                key={index}
              >
                <div
                  className={clsx(
                    'h-[9.8rem] w-[9.8rem] cursor-pointer rounded-full border',
                  )}
                  key={index}
                  onClick={() => {
                    tutorialStep === 6 && setTutorialStep((prev) => prev + 1)
                    tutorialStep === 6 &&
                      sendtoUnity(
                        'MessageReceiver',
                        'OnClickedButton',
                        'gpt_discard',
                      )
                    setOpenMood(false)
                    roomMood(index)
                  }}
                >
                  <AutoSizeImage
                    src={image_url}
                    rounded="10"
                    className="h-full w-full"
                  />
                </div>
                <CSText size="20" color="black" weight="bold">
                  {title}
                </CSText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChooseMoodModal
