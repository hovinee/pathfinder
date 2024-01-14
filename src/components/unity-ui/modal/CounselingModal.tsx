'use client'

import WorldTab from '@/components/tab/WorldTab'
import Audio from '@/components/ui/audio/Audio'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSButton from '@/components/ui/button/CSButton'
import CSSpan from '@/components/ui/span/CSSpan'
import CSText from '@/components/ui/text/CSText'
import { thumbnailCounseling } from '@/data/unity/data'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'

interface TProps {
  setSelectPlace: Dispatch<SetStateAction<ReactUnityEventParameter>>
}

const CounselingModal = ({ setSelectPlace }: TProps) => {
  const router = useRouter()

  const [selectHealing, setSelectHealing] = useState<boolean>(false)
  const [healingNum, setHealingNum] = useState<number>(0)
  const [thumbnailNum, setThumbnailNum] = useState<number>(0)
  const handleHealing = (num: number) => {
    setSelectHealing(true)
    setHealingNum(num)
  }

  return (
    <div className="grid h-full w-full place-items-center">
      <div
        className={clsx(
          'custom-scrollbar relative h-[80rem] max-w-[150rem] overflow-auto rounded-lg bg-white/80',
          selectHealing
            ? 'px-[11rem] pb-[12rem] pt-[11rem]'
            : 'px-[10rem] py-[6rem]',
        )}
      >
        <div
          className="absolute right-[1.5rem] top-[1.5rem]"
          onClick={() => setSelectPlace('')}
        >
          <AutoSizeImage
            src={'/images/unity/close.png'}
            rounded="10"
            className="h-[1.6rem] w-[1.6rem]"
          />
        </div>
        {!selectHealing && (
          <>
            <CSText size="24" color="black" weight="bold">
              상담월드
            </CSText>
            <div className="grid grid-cols-4 gap-[1.5rem]">
              {thumbnailCounseling.map(
                ({ thumbnail_image, title, sub_title }, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleHealing(index)}
                  >
                    <div className="mt-[2rem]">
                      <div className="w-[30rem]">
                        <AutoSizeImage
                          src={thumbnail_image[0]}
                          full
                          roundedTop="10"
                        />
                        <div className="h-[8rem] w-full rounded-b-[1rem] bg-white pl-[1.9rem] pt-[1.5rem]">
                          <CSText size="21" color="black" weight="bold">
                            {title}
                          </CSText>
                          <CSText
                            size="14"
                            color="black"
                            className="mt-[0.5rem]"
                          >
                            {sub_title}
                          </CSText>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </>
        )}

        {selectHealing && (
          <div className="flex h-full gap-[1.5rem]">
            <div className="flex flex-col">
              <AutoSizeImage
                src={
                  thumbnailCounseling[healingNum].thumbnail_image[thumbnailNum]
                }
                className="h-[45rem] w-full"
                rounded="10"
              />
              <div className="mt-[1.5rem] grid flex-1 grid-cols-4 gap-[1.5rem]">
                {thumbnailCounseling[healingNum].thumbnail_image.map(
                  (image, index) => (
                    <>
                      {thumbnailNum !== index && (
                        <AutoSizeImage
                          src={image}
                          full
                          key={index}
                          rounded="10"
                          onClick={() => setThumbnailNum(index)}
                        />
                      )}
                    </>
                  ),
                )}
              </div>
            </div>
            <div className="flex h-full w-[47.5rem] flex-col rounded-[1rem] bg-white p-[3rem]">
              <div>
                <CSText size="31" color="black" weight="bold">
                  {thumbnailCounseling[healingNum].title}
                </CSText>
                <CSText
                  size="16"
                  color="black"
                  className="custom-scrollbar mt-[1rem] h-[25rem] overflow-auto whitespace-pre-line"
                >
                  {thumbnailCounseling[healingNum].description}
                </CSText>
                <Audio
                  audioPath={thumbnailCounseling[healingNum].audio}
                  black
                />
                <div className="mt-[0.5rem]">
                  {thumbnailCounseling[healingNum].tag.map((value, index) => (
                    <div
                      className="mb-[1rem] mr-[1rem] inline-block cursor-pointer rounded-[1rem] border border-[#DCDCDC] px-[1.5rem] text-center hover:opacity-70"
                      key={index}
                    >
                      <CSText size="16" className="text-[#AFAFAF]">
                        {value}
                      </CSText>
                    </div>
                  ))}
                </div>
                <div className="mt-[0.8rem] flex gap-[1rem]">
                  <div className="flex items-center gap-[0.2rem]">
                    <AutoSizeImage
                      src={'/images/star.png'}
                      className="h-[2rem] w-[2rem]"
                    />
                    <CSText size="18" color="black">
                      4.8{' '}
                      <CSSpan className="text-[#AFAFAF]" size="18">
                        (196)
                      </CSSpan>
                    </CSText>
                  </div>
                  <div className="flex items-center gap-[0.2rem]">
                    <AutoSizeImage
                      src={'/images/unity/healing/heart.png'}
                      className="h-[1.6rem] w-[1.9rem]"
                    />
                    <CSText size="18" color="black" weight="bold">
                      1,123
                    </CSText>
                  </div>
                </div>

                <div className="mt-[2rem] flex gap-[2.3rem]">
                  <CSButton
                    className="border-b bg-gradient-to-r from-[#FF95AE] to-[#B02DFF]"
                    width="260"
                    height="50"
                    size="18"
                    color="white"
                    rounded="10"
                    weight="bold"
                    onClick={() =>
                      thumbnailCounseling[healingNum].path
                        ? window.open(thumbnailCounseling[healingNum].path!)
                        : alert('준비중입니다')
                    }
                  >
                    입장하기
                  </CSButton>

                  <div className="grid flex-1 place-items-center">
                    <div className="flex gap-[2rem]">
                      <div className="flex flex-col items-center gap-[0.3rem]">
                        <div className="w-[2.3rem] ">
                          <AutoSizeImage
                            src={'/images/unity/healing/like.png'}
                            full
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-[0.3rem]">
                        <AutoSizeImage
                          src={'/images/unity/healing/share.png'}
                          className="h-[2rem] w-[2rem]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectHealing && (
          <div className="custom-scrollbar mt-[3rem] flex-1 overflow-auto border-t border-t-[#E1DDDD]">
            <WorldTab black />
          </div>
        )}
      </div>
    </div>
  )
}

export default CounselingModal
