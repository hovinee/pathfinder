'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation, Scrollbar } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required moduless
// import './style.css'
import CSText from '../ui/text/CSText'

import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'
import CSSpan from '../ui/span/CSSpan'
import { TCourseRocommend, TExperienceContents } from '@/utils/types'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface TProps {
  contents?: TExperienceContents['contents']
  recommend?: TCourseRocommend[]
  rank?: TCourseRocommend[]
}
const SwiperSlider = ({ contents, recommend, rank }: TProps) => {
  const router = useRouter()
  SwiperCore.use([Navigation, Scrollbar])

  return (
    <>
      {contents && (
        <Swiper spaceBetween={30} slidesPerView="auto">
          {contents.map((value, index) => (
            <SwiperSlide key={index} style={{ width: '40.1rem' }}>
              <AutoSizeImage
                src={value.thumbnail}
                className="h-[23.1rem] w-full"
                rounded="10"
              />

              <div className="flex items-center">
                <CSText weight="bold" size="35" color="black">
                  {index + 1}
                </CSText>
                <CSText
                  size="16"
                  color="black"
                  className="ml-[0.8rem] mt-[1rem]"
                >
                  랩키드 시즌{index + 1}_
                </CSText>
                <CSSpan size="16" weight="bold" className="mt-[1rem]">
                  {value.title}
                </CSSpan>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {recommend && (
        <>
          <div className="mb-[3rem] flex items-center justify-between">
            <CSText
              size="21"
              weight="bold"
              color="white"
              className="font-inter"
            >
              추천강의
            </CSText>
            <div className="flex gap-[3rem]">
              <AutoSizeImage
                src={'/images/left_arrow.png'}
                className="arrow-left h-[1.1rem] w-[0.7rem] cursor-pointer"
              />
              <AutoSizeImage
                src={'/images/right_arrow.png'}
                className="arrow-right h-[1.1rem] w-[0.7rem] cursor-pointer"
              />
            </div>
          </div>
          <Swiper
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1240: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={18}
            modules={[Navigation]}
            navigation={{ nextEl: '.arrow-right', prevEl: '.arrow-left' }}
          >
            {recommend.map((value, index) => (
              <SwiperSlide
                key={index}
                className="cursor-pointer"
                onClick={() => {
                  value.video_uid
                    ? router.push(value.path)
                    : alert('현재 강의 준비중 입니다.')
                }}
              >
                <AutoSizeImage src={value.thumbnail} full rounded="10" />

                <div className="h-[4.6rem]">
                  <CSText
                    size="16"
                    weight="bold"
                    className="mt-[1rem]"
                    color="white"
                  >
                    {value.title}
                  </CSText>
                </div>
                <div className="h-[4.1rem]">
                  <CSText
                    size="12"
                    className="mt-[0.8rem] line-clamp-2"
                    color="white"
                  >
                    {value.intro}
                  </CSText>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}

      {rank && (
        <>
          <div className="mb-[3rem] flex items-center justify-between">
            <CSText
              size="21"
              weight="bold"
              color="white"
              className="font-inter"
            >
              TOP 5
            </CSText>
            <div className="flex gap-[3rem]">
              <AutoSizeImage
                src={'/images/left_arrow.png'}
                className="arrow-left-rank h-[1.1rem] w-[0.7rem] cursor-pointer"
              />
              <AutoSizeImage
                src={'/images/right_arrow.png'}
                className="arrow-right-rank h-[1.1rem] w-[0.7rem] cursor-pointer"
              />
            </div>
          </div>
          <Swiper
            spaceBetween={30}
            slidesPerView="auto"
            modules={[Navigation]}
            navigation={{
              nextEl: '.arrow-right-rank',
              prevEl: '.arrow-left-rank',
            }}
          >
            {rank.map((value, index) => (
              <SwiperSlide
                key={index}
                style={{ width: '40.1rem' }}
                className="cursor-pointer"
              >
                <AutoSizeImage
                  src={value.thumbnail}
                  className="h-[23.1rem] w-full"
                  rounded="10"
                />
                <div className="mt-[1.1rem] flex h-[9rem] w-full gap-[1.1rem]">
                  <div className="flex h-full min-w-[3.3rem] justify-center rounded-[0.5rem] bg-[#00A886]">
                    <CSText weight="bold" size="31" color="white">
                      {index + 1}
                    </CSText>
                  </div>
                  <div className="h-[4.6rem]">
                    <CSText size="16" weight="bold" color="white">
                      {value.title}
                    </CSText>
                    <CSText
                      size="12"
                      className="mt-[0.8rem] line-clamp-2"
                      color="white"
                    >
                      {value.intro}
                    </CSText>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </>
  )
}

export default SwiperSlider
