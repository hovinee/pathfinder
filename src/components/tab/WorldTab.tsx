import { motion, AnimatePresence } from 'framer-motion'
import CSText from '../ui/text/CSText'
import { useState } from 'react'
import clsx from 'clsx'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'

const tabs = [{ label: '월드소개' }, { label: '월드리뷰' }]

interface TProps {
  black?: boolean
}

const WorldTab = ({ black = false }: TProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0])
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
  return (
    <div className="mt-[2rem] flex w-full flex-col overflow-auto pr-[1rem]">
      <nav>
        <ul className="flex gap-[3.3rem] ">
          {tabs.map((item, index) => (
            <li
              key={item.label}
              className="relative cursor-pointer"
              onClick={() => setSelectedTab(item)}
            >
              <CSText
                size="21"
                className={clsx(
                  selectedTab.label === item.label
                    ? black
                      ? 'text-black'
                      : 'text-white'
                    : black
                      ? 'text-black/30'
                      : 'text-white/30',
                )}
                weight="bold"
              >
                {item.label}
              </CSText>
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
            {selectedTab.label === '월드소개' ? (
              <>
                <div className="mb-[1rem] flex items-center gap-[1.6rem]">
                  <AutoSizeImage
                    src={'/images/unity/profile.png'}
                    className="h-[5.7rem] w-[5.7rem]"
                  />
                  <div>
                    <CSText
                      size="18"
                      color={black ? 'black' : 'white'}
                      weight="bold"
                    >
                      Global Luna
                    </CSText>
                    <CSText
                      size="16"
                      color={black ? 'black' : 'white'}
                      className="mt-[0.3rem]"
                    >
                      Version Update Information.
                    </CSText>
                  </div>
                </div>
                <CSText
                  size="18"
                  color={black ? 'black' : 'white'}
                  weight="bold"
                  className="mb-[0.5rem]"
                >
                  12/07/2021 Winter theme renewal
                </CSText>
                <CSText
                  size="18"
                  color={black ? 'black' : 'white'}
                  weight="bold"
                  className="mb-[0.5rem]"
                >
                  09/10/2021 Autumn theme renewal
                </CSText>
                <CSText
                  size="18"
                  color={black ? 'black' : 'white'}
                  weight="bold"
                  className="mb-[0.5rem]"
                >
                  07/10/2021 Summer theme renewal
                </CSText>
              </>
            ) : (
              <>
                <div className="flex items-center gap-[0.7rem]">
                  <CSText
                    weight="bold"
                    color={black ? 'black' : 'white'}
                    size="21"
                  >
                    4.8
                  </CSText>
                  <div className="flex items-center gap-[0.5rem]">
                    {[0, 0, 0, 0, 0].map((_value, index) => (
                      <AutoSizeImage
                        key={index}
                        src={'/images/star.png'}
                        className="h-[1.6rem] w-[1.6rem]"
                      />
                    ))}
                    <CSText color={black ? 'black' : 'white'} size="15">
                      (22)
                    </CSText>
                  </div>
                </div>

                <div className="mt-[2rem] flex justify-between">
                  <CSText color={black ? 'black' : 'white'} size="15">
                    전체리뷰 22개
                  </CSText>
                  <div className="flex gap-[2.2rem]">
                    <CSText color={black ? 'black' : 'white'} size="15">
                      최신순
                    </CSText>
                    <CSText color={black ? 'black' : 'white'} size="15">
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
                                className="h-[2rem] w-[2rem]"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between">
                          <CSText
                            size="16"
                            color={black ? 'black' : 'white'}
                            className="mt-[0.3rem]"
                          >
                            {value.name}
                          </CSText>
                          <CSText size="14" color="787878">
                            {value.data}
                          </CSText>
                        </div>
                      </div>
                      <CSText
                        size="16"
                        color={black ? 'black' : 'white'}
                        className="mt-[2.8rem]"
                      >
                        {value.review}
                      </CSText>
                      <div className="mt-[3.6rem] flex justify-end gap-[1.3rem]">
                        <AutoSizeImage
                          src={'/images/thumb_up.png'}
                          className="h-[2rem] w-[2rem]"
                        />
                        <AutoSizeImage
                          src={'/images/thumb_down.png'}
                          className="h-[2rem] w-[2rem]"
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

export default WorldTab
