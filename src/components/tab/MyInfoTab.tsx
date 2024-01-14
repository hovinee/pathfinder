'use client'

import { motion, AnimatePresence } from 'framer-motion'
import CSText from '../ui/text/CSText'
import { useState } from 'react'

import { TMyCourse } from '@/utils/types'
import Link from 'next/link'
import CSButton from '../ui/button/CSButton'

interface TProps {
  myCourses: TMyCourse[]
}

const tabs = [{ label: '수강중' }, { label: '수강완료' }]

const MyInfoTab = ({ myCourses }: TProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  return (
    <div className="mt-[4.3rem] flex w-full flex-col overflow-auto ">
      <nav>
        <ul className="flex gap-[3.3rem] border-b border-[#BFBFBF] pb-[0.9rem]">
          {tabs.map((item) => (
            <li
              key={item.label}
              className="relative cursor-pointer"
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
      <main className="w-full py-[3rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : 'empty'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <>
              <div className="flex justify-end">
                <div className="flex gap-[2.3rem]">
                  {['수강순', '가나다순'].map((value, index) => (
                    <div key={index} className="flex">
                      <CSText size="16" color="white">
                        {value}
                      </CSText>
                      {/* <AutoSizeImage
                          src={'/images/my_info/arrow_bottom.png'}
                          className="h-[0.8rem] w-[0.5rem]"
                        /> */}
                    </div>
                  ))}
                </div>
              </div>
              {myCourses.map(({ title, path }, index) => (
                <div
                  className="bg-white/15 mt-[1.7rem] flex h-[17rem] w-full flex-col rounded-[2.5rem] border px-[2.6rem] py-[1.4rem] shadow-lg"
                  key={index}
                >
                  <div className="flex-1 ">
                    <div className="grid h-[2.6rem] w-[7.3rem] place-items-center rounded-[1.5rem] bg-[#00A886] text-12 text-white">
                      수강중
                    </div>
                    <CSText size="16" color="white" className="mt-[0.9rem]">
                      {title}
                    </CSText>
                    <CSText size="11" color="white" className="mt-[0.9rem]">
                      수강기간 : 평생수강
                    </CSText>
                  </div>
                  <div className="flex items-center justify-between">
                    <CSText size="16" color="white" className="mt-[0.9rem]">
                      현재 수강률 : 80%
                    </CSText>
                    <Link href={path}>
                      <CSButton
                        width="260"
                        height="38"
                        bgColor="00A886"
                        size="14"
                        color="white"
                        rounded="5"
                      >
                        온라인 강의 시청하기
                      </CSButton>
                    </Link>
                  </div>
                </div>
              ))}
            </>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default MyInfoTab
