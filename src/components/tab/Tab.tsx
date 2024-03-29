'use client'

import { motion, AnimatePresence } from 'framer-motion'
import CSText from '../ui/text/CSText'
import { useState } from 'react'
import { TCourse } from '@/utils/types'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'

interface TProps {
  course: TCourse
}

const tabs = [{ label: '강좌소개' }, { label: '수강리뷰' }]
const review = [
  {
    name: '최강영찬',
    data: '2023.01.06',
    review:
      '무료버전을 해보니 다른 콘텐츠도 보고싶은데  무료체험 7일이라던지 있으면 더 해보고싶네요 재밌습니다.',
  },
  {
    name: '나리777',
    data: '2023.12.05',
    review:
      '아기자기하고 이쁜 것 같아요! 몰입이 잘되서 좀 신기했고 베이식 요금제로 다른것도 해보고있습니다!',
  },
]
const Tab = ({ course }: TProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  return (
    <div className="mt-[5.7rem] flex w-full flex-col">
      <nav>
        <ul className="flex gap-[3.3rem]">
          {tabs.map((item) => (
            <li
              key={item.label}
              className={'relative cursor-pointer'}
              onClick={() => setSelectedTab(item)}
            >
              <CSText size="21" color="00A886">
                {item.label}
              </CSText>
              {item === selectedTab ? (
                <motion.div
                  className="absolute left-0 right-0 mt-[0.9rem] h-[3px] bg-00A886"
                  layoutId="underline"
                />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <main className="mt-[5.3rem] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : 'empty'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="min-h-[40rem]"
            transition={{ duration: 0.2 }}
          >
            {selectedTab.label === '강좌소개' ? (
              <>
                <CSText weight="bold" color="black" size="16">
                  강의 개요
                </CSText>
                <CSText color="black" size="16" className="mt-[2.5rem]">
                  {course.summary}
                </CSText>
                <CSText
                  weight="bold"
                  color="black"
                  size="16"
                  className="mt-[2.5rem]"
                >
                  학습 목표
                </CSText>
                <CSText color="black" size="16" className="mt-[2.5rem]">
                  {course.purpose}
                </CSText>
                <CSText
                  weight="bold"
                  color="black"
                  size="16"
                  className="mt-[2.5rem]"
                >
                  학습 대상
                </CSText>
                <CSText color="black" size="16" className="mt-[2.5rem]">
                  {course.target}
                </CSText>
              </>
            ) : (
              <>
                <div className="flex h-[11.6rem] w-full flex-col items-center justify-center rounded-[1rem] border shadow-md">
                  <div className="flex items-center gap-[2.3rem]">
                    <CSText weight="bold" color="black" size="35">
                      4.8
                    </CSText>
                    <div className="flex gap-[1.1rem]">
                      {[0, 0, 0, 0, 0].map((_value, index) => (
                        <AutoSizeImage
                          key={index}
                          src={'/images/star.png'}
                          className="h-[2rem] w-[2rem]"
                        />
                      ))}
                      <CSText color="555555" size="15">
                        (22)
                      </CSText>
                    </div>
                  </div>
                  <CSText color="black" size="16">
                    수강생의 98%가 만족했어요
                  </CSText>
                </div>
                <div className="mt-[6.2rem] flex justify-between">
                  <CSText color="black" size="15">
                    전체리뷰 22개
                  </CSText>
                  <div className="flex gap-[2.2rem]">
                    <CSText color="black" size="15">
                      최신순
                    </CSText>
                    <CSText color="B1B1B1" size="15">
                      인기순
                    </CSText>
                  </div>
                </div>

                {review.map((value, index) => (
                  <div
                    className="flex gap-[1.8rem] border-b pb-[1.2rem] pt-[4.7rem]"
                    key={index}
                  >
                    <AutoSizeImage
                      src={'/images/profile.png'}
                      className="h-[4.5rem] min-w-[4.5rem]"
                    />
                    <div>
                      <div>
                        <div className="flex gap-[0.5rem]">
                          {[0, 0, 0, 0, 0].map((_, index) => (
                            <div key={index}>
                              <AutoSizeImage
                                src={'/images/star.png'}
                                className="h-[2.4rem] w-[2.4rem]"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between">
                          <CSText
                            size="16"
                            color="787878"
                            className="mt-[0.3rem]"
                          >
                            {value.name}
                          </CSText>
                          <CSText size="14" color="787878">
                            {value.data}
                          </CSText>
                        </div>
                      </div>
                      <CSText size="16" color="787878" className="mt-[2.8rem]">
                        {value.review}
                      </CSText>
                      <div className="mt-[3.6rem] flex justify-end gap-[1.3rem]">
                        <AutoSizeImage
                          src={'/images/thumb_up.png'}
                          className="h-[2.4rem] w-[2.4rem]"
                        />
                        <AutoSizeImage
                          src={'/images/thumb_down.png'}
                          className="h-[2.4rem] w-[2.4rem]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default Tab
