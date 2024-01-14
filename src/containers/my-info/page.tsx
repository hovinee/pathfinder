'use client'

import MyInfoHeaderSection from '@/components/my-info/MyInfoHeroSection'
import MyInfoPCHeroSection from '@/components/my-info/MyInfoPCHeroSection'
import MyInfoTab from '@/components/tab/MyInfoTab'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSButton from '@/components/ui/button/CSButton'
import CSText from '@/components/ui/text/CSText'
import { TMyCourse } from '@/utils/types'
import clsx from 'clsx'
import { useState } from 'react'

interface TProps {
  myCourses: TMyCourse[]
}

const MyInfo = ({ myCourses }: TProps) => {
  const [selectList, setSelectList] = useState<number>(0)

  const list = ['나의 강좌', '최근 본 동영상']
  const lectureInfo = [
    { title: '진행중인\n강의', contents: '5개' },
    {
      title: '전체 강의시간 /\n시청시간',
      total: '80:05:08',
      currnet: '5:05:10',
    },
    { title: '날짜별\n수강시간', contents: '15일' },
  ]

  return (
    <div className="mt-[8.4rem] h-screen lg:flex">
      <MyInfoHeaderSection />
      <MyInfoPCHeroSection
        list={list}
        setSelectList={setSelectList}
        selectList={selectList}
      />
      <div className="mx-auto mt-[3rem] flex w-[64.8rem] flex-col lg:mt-[12rem] xl:mx-0 xl:w-[88.4rem] xl:pl-[5.1rem]">
        <CSText
          size="21"
          color="white"
          weight="bold"
          className="hidden lg:block"
        >
          {list[selectList]}
        </CSText>
        <div className="flex gap-[1.44rem] lg:hidden">
          {list.map((value, index) => (
            <CSButton
              width="140"
              height="38"
              bgColor={clsx(index === 0 ? '00A886' : 'D1D1D1')}
              size="18"
              color="white"
              rounded="30"
              weight="semiBold"
              key={index}
            >
              {value}
            </CSButton>
          ))}
        </div>
        {myCourses ? (
          <>
            <div className="flex gap-[0.9rem]">
              {lectureInfo.map((value, index) => (
                <div
                  className="bg-white/15 mt-[3.8rem] h-[11.4rem] w-[20.2rem] rounded-[0.7rem] border px-[1.8rem] py-[1rem] shadow-lg"
                  key={index}
                >
                  <div className="relative h-full">
                    <CSText
                      size="14"
                      color="white"
                      className="whitespace-pre-line"
                    >
                      {value.title}
                    </CSText>
                    {value.contents && (
                      <div className="absolute bottom-0 right-0">
                        <CSText
                          size="31"
                          weight="bold"
                          color="white"
                          className="whitespace-pre-line"
                        >
                          {value.contents}
                        </CSText>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <MyInfoTab myCourses={myCourses} />
          </>
        ) : (
          <div className="mt-[20rem] flex h-full flex-col items-center">
            <AutoSizeImage
              src={'/images/my_info/no_courses.png'}
              className="h-[15rem] w-[15rem]"
            />
            <CSText size="21" color="565656">
              수강중인 강의가 없습니다
            </CSText>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyInfo
