'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSButton from '@/components/ui/button/CSButton'
import CSText from '@/components/ui/text/CSText'
import { wantCounselingData } from '@/data/unity/data'
import { TTutorial } from '@/utils/types'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'

interface TProps {
  wantCounseling: number
  setWantCounseling: Dispatch<SetStateAction<number>>
  setSelectCounseling: Dispatch<SetStateAction<boolean>>
  setOpenMenu: Dispatch<SetStateAction<boolean>>
  setTutorialStep: Dispatch<SetStateAction<number>>
  setChat: Dispatch<SetStateAction<TTutorial[]>>
  tutorialStep: number
  sendToGPT: (selectMesssage: string) => void
  sendtoUnity: (
    gameObjectName: string,
    methodName: string,
    parameter?: ReactUnityEventParameter,
  ) => void
}

const ChooseCounselingModal = ({
  setWantCounseling,
  wantCounseling,
  setSelectCounseling,
  setOpenMenu,
  setTutorialStep,
  tutorialStep,
  sendToGPT,
  setChat,
  sendtoUnity,
}: TProps) => {
  const chooseCounseling = () => {
    const selectMesssage = `${wantCounselingData[wantCounseling].title}에 대해 상담하고 싶어`

    setChat((prevMessages) => [
      ...prevMessages,
      { text: selectMesssage, who: 'user' },
    ])
    tutorialStep !== 5 && sendToGPT(selectMesssage)
    tutorialStep === 5 && setTutorialStep((prev) => prev + 1),
      tutorialStep === 5 &&
        sendtoUnity('MessageReceiver', 'OnClickedButton', 'gpt_discard')
    setSelectCounseling(true), setOpenMenu(false)
  }

  return (
    <div className="z-20 grid h-full w-full place-items-center">
      <div className="h-[32.8rem] rounded-[1rem] bg-white/75 px-[2rem] pt-[2rem]">
        <div className="flex flex-col items-center">
          <CSText size="24" color="black" weight="bold">
            원하시는 상담을 골라주세요
          </CSText>

          <div className="mt-[2.1rem] flex gap-[2.2rem]">
            {wantCounselingData.map(({ title, image_url }, index) => (
              <div
                className="flex flex-col items-center gap-[2rem]"
                key={index}
              >
                <div
                  className={clsx(
                    'grid h-[9.8rem] w-[9.8rem] cursor-pointer place-items-center rounded-full',
                    index === wantCounseling ? 'bg-383838' : 'bg-white',
                  )}
                  onClick={() => setWantCounseling(index)}
                >
                  {index === 0 && (
                    <AutoSizeImage
                      src={image_url[index === wantCounseling ? 1 : 0]}
                      rounded="10"
                      className="h-[5.5rem] w-[5.2rem]"
                    />
                  )}
                  {index === 1 && (
                    <AutoSizeImage
                      src={image_url[index === wantCounseling ? 1 : 0]}
                      rounded="10"
                      className="mb-[1rem] h-[5.4rem] w-[7.1rem]"
                    />
                  )}
                  {index === 2 && (
                    <AutoSizeImage
                      src={image_url[index === wantCounseling ? 1 : 0]}
                      rounded="10"
                      className="h-[5.9rem] w-[4.9rem]"
                    />
                  )}
                  {index === 3 && (
                    <div className="w-[5.8rem]">
                      <AutoSizeImage
                        src={image_url[index === wantCounseling ? 1 : 0]}
                        full
                      />
                    </div>
                  )}
                  {index === 4 && (
                    <AutoSizeImage
                      src={image_url[index === wantCounseling ? 1 : 0]}
                      rounded="10"
                      className="h-[5rem] w-[7rem]"
                    />
                  )}
                </div>
                <CSText
                  size="20"
                  color="black"
                  weight={clsx(index === wantCounseling ? 'bold' : 'normal')}
                >
                  {title}
                </CSText>
              </div>
            ))}
          </div>
          <CSButton
            width="184"
            height="50"
            bgColor="181818"
            size="24"
            color="white"
            rounded="5"
            weight="semiBold"
            className="mx-auto mt-[2rem]"
            onClick={chooseCounseling}
          >
            선택하기
          </CSButton>
        </div>
      </div>
    </div>
  )
}

export default ChooseCounselingModal
