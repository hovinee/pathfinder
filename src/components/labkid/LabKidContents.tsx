'use client'

import { TLabKidContents } from '@/utils/types'
import CSText from '../ui/text/CSText'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import Video from '../ui/video/Video'
import { getVideoData } from '@/lib/video_data'
import DownLoadButton from '../ui/download-button/DownLoadButton'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'

interface Props extends TLabKidContents {
  season: string
}
const args = {
  styles: {
    width: '100%',
    aspectRatio: '16 / 9',
  },
  videoOptions: {
    controls: true,
    autoplay: false,
  },
}

const LabKidContents = ({ contents, season }: Props) => {
  const [chapterNum, setChapterNum] = useState<number>(0)
  const [source, setSource] = useState({ src: '', type: '' })

  const changeVideo = useCallback(async () => {
    const data = await getVideoData(contents[chapterNum].video_uid)
    const videoSource = {
      src: data?.play?.hls?.link,
      type: 'application/x-mpegURL',
    }
    return setSource(videoSource)
  }, [chapterNum, contents])

  useEffect(() => {
    changeVideo()
  }, [changeVideo])

  return (
    <div className="mt-[4.7rem] border-t-4 border-t-00A886">
      <div className="mx-auto flex justify-center gap-[2.3rem] lg:gap-[3.5rem] xl:gap-[5.5rem]">
        <aside className="h-full">
          <div className="relative w-[27rem] bg-F1F1F1 px-[1.5rem] py-[2.5rem]">
            <div>
              <CSText
                size="18"
                color="black"
                weight="bold"
                className="ml-[2rem] mt-[1.1rem]"
              >
                {season}
              </CSText>
              <div
                className={clsx(
                  'mt-[2rem] flex cursor-pointer flex-col gap-[2rem]',
                )}
              >
                {contents.map(({ title }, index) => (
                  <div
                    key={index}
                    className="whitespace-pre-line border-b-2 border-b-transparent py-[0.8rem] pl-[2.5rem] hover:rounded-tl-[1rem] hover:border-b-00A886 hover:bg-white"
                    onClick={() => {
                      setChapterNum(index)
                    }}
                  >
                    <CSText size="15" color="black">
                      CHAPTER {index}.
                    </CSText>
                    <CSText size="15" color="black">
                      {title}
                    </CSText>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-[16.2rem]   w-full rounded-b-[1rem] bg-E4E4E4 py-[1.6rem] pl-[4rem]">
            <div className="flex w-full">
              <DownLoadButton />
            </div>

            <div className="mt-[1.6rem] flex flex-col gap-[0.6rem] border-t border-t-D9D9D9 pt-[1.5rem]">
              <div className="flex gap-[0.7rem]">
                <AutoSizeImage
                  src={'/images/favorite.png'}
                  className="h-[2.4rem] w-[2.4rem]"
                />
                <CSText size="18" color="7D7D7D">
                  위시리스트에 추가
                </CSText>
              </div>
              <div className="flex gap-[0.7rem]">
                <AutoSizeImage
                  src={'/images/share_2.png'}
                  className="h-[2.4rem] w-[2.4rem]"
                />
                <CSText size="18" color="7D7D7D">
                  공유
                </CSText>
              </div>
            </div>
          </div>
        </aside>
        <div className="w-[40.5rem] whitespace-pre-line pt-[2.5rem] lg:w-[61rem]">
          <CSText size="18" color="white">
            CHAPTER {chapterNum}.
          </CSText>
          <CSText size="31" color="white" className="mt-[0.7rem]">
            {contents[chapterNum].title}
          </CSText>
          <AutoSizeImage
            src={contents[chapterNum].thumbnail}
            className="mt-[2.5rem] h-[34.3rem] w-full"
            rounded="10"
          />
          {source.src && (
            <div className="mt-[3rem]">
              <Video
                {...args}
                sources={source}
                uid={contents[chapterNum].video_uid}
              />
            </div>
          )}
          {contents[chapterNum].job_intro && (
            <>
              <CSText
                size="16"
                color="white"
                weight="bold"
                className="mt-[3rem]"
              >
                직업소개
              </CSText>

              <CSText size="16" color="white">
                {contents[chapterNum].job_intro?.future_job}
              </CSText>
              <CSText size="16" color="white">
                {contents[chapterNum].job_intro.current_job}
              </CSText>
            </>
          )}
          <CSText size="16" color="white" weight="bold" className="mt-[3rem]">
            콘텐츠 유형
          </CSText>
          <CSText size="16" color="white">
            {contents[chapterNum].contents_format}
          </CSText>
          <CSText size="16" color="white" weight="bold" className="mt-[3rem]">
            동기부여
          </CSText>
          <CSText size="16" color="white">
            {contents[chapterNum].motivation}
          </CSText>
          <CSText size="16" color="00A886" className="my-[3rem]" weight="bold">
            {contents[chapterNum].tag}
          </CSText>
          ===========================================================
          <CSText size="16" color="white" weight="bold" className="mt-[3rem]">
            시놉시스
          </CSText>
          <CSText size="16" color="white" className="mt-[0.3rem]">
            {contents[chapterNum].synopsis.title}
          </CSText>
          {contents[chapterNum].synopsis.sub_title && (
            <CSText size="16" color="white">
              {contents[chapterNum].synopsis.sub_title}
            </CSText>
          )}
          <CSText size="16" color="white" className="mt-[1rem]">
            {contents[chapterNum].synopsis.description}
          </CSText>
        </div>
      </div>
    </div>
  )
}

export default LabKidContents
