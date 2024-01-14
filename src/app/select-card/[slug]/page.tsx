'use client'

import WorldTab from '@/components/tab/WorldTab'
import Audio from '@/components/ui/audio/Audio'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSButton from '@/components/ui/button/CSButton'
import CSSpan from '@/components/ui/span/CSSpan'
import CSText from '@/components/ui/text/CSText'
import {
  thumbnailCounseling,
  thumbnailDiagnosis,
  thumbnailHealing,
} from '@/data/unity/data'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const SelectCardPage = () => {
  const path = usePathname().split('/')[2].split(',')
  const world = Number(path[0])
  const worldIndex = Number(path[1])
  const router = useRouter()

  const [thumbnailNum, setThumbnailNum] = useState<number>(0)

  const tumbnailContent =
    world === 0
      ? thumbnailCounseling
      : world === 1
        ? thumbnailHealing
        : thumbnailDiagnosis

  return (
    <main className="px-[1.8rem]">
      <div className="mx-auto mt-[15rem] max-w-[127rem]">
        <div className="flex h-[60.5rem] gap-[1.5rem]">
          <div className="flex flex-col">
            <div className="h-[47.7rem] w-[84.9rem]">
              <AutoSizeImage
                src={tumbnailContent[worldIndex].thumbnail_image[thumbnailNum]}
                full
                objectCover
                rounded="10"
              />
            </div>
            <div className="mt-[1.5rem] grid flex-1 grid-cols-4 gap-[1.5rem]">
              {tumbnailContent[worldIndex].thumbnail_image.map(
                (image, index) => (
                  <>
                    {thumbnailNum !== index && (
                      <AutoSizeImage
                        src={image}
                        className="h-[11.3rem] w-[20.1rem]"
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
          <div className="flex h-full max-w-[47.5rem] flex-col rounded-[1rem] bg-181818/75 px-[3rem]">
            <div>
              <CSText size="31" color="white" weight="bold">
                {tumbnailContent[worldIndex].title}
              </CSText>
              <CSText
                size="16"
                color="white"
                className="custom-scrollbar mt-[1rem] h-[31.5rem] overflow-auto whitespace-pre-line"
              >
                {tumbnailContent[worldIndex].description}
              </CSText>
              <Audio audioPath={tumbnailContent[worldIndex].audio} />
              <div className="mt-[1rem]">
                {tumbnailContent[worldIndex].tag.map((value, index) => (
                  <div
                    className="mb-[1rem] mr-[1rem] inline-block cursor-pointer rounded-[1rem] border border-white px-[1.5rem] text-center hover:opacity-70"
                    key={index}
                  >
                    <CSText size="16" color="white">
                      {value}
                    </CSText>
                  </div>
                ))}
              </div>

              <div className="mt-[2rem] flex gap-[1rem]">
                <div className="flex items-center gap-[0.2rem]">
                  <AutoSizeImage
                    src={'/images/star.png'}
                    className="h-[2rem] w-[2rem]"
                  />
                  <CSText size="18" color="white">
                    4.8{' '}
                    <CSSpan className="text-white" size="18">
                      (196)
                    </CSSpan>
                  </CSText>
                </div>
                <div className="flex items-center gap-[0.2rem]">
                  <AutoSizeImage
                    src={'/images/unity/healing/heart.png'}
                    className="h-[1.6rem] w-[1.9rem]"
                  />
                  <CSText size="18" color="white" weight="bold">
                    1,123
                  </CSText>
                </div>
              </div>

              <div className="mt-[2rem] flex items-end gap-[2.3rem]">
                <CSButton
                  className="bg-gradient-to-r from-[#FF95AE] to-[#B02DFF]"
                  width="260"
                  height="50"
                  size="18"
                  color="white"
                  rounded="10"
                  weight="bold"
                  onClick={() =>
                    tumbnailContent[worldIndex].path
                      ? window.open(tumbnailContent[worldIndex].path!)
                      : alert('준비중입니다')
                  }
                >
                  입장하기
                </CSButton>

                <div className="grid flex-1 place-items-center">
                  <div className="flex gap-[2rem]">
                    <div className="flex flex-col items-center gap-[0.3rem]">
                      <AutoSizeImage
                        src={'/images/like.png'}
                        className="h-[2rem] w-[2.3rem] "
                      />
                    </div>
                    <div className="flex flex-col items-center gap-[0.3rem]">
                      <AutoSizeImage
                        src={'/images/share.png'}
                        className="h-[2rem] w-[2rem]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="custom-scrollbar mt-[3rem] flex-1 overflow-auto border-t border-t-[#E1DDDD]">
          <WorldTab />
        </div>
      </div>
    </main>
  )
}

export default SelectCardPage
