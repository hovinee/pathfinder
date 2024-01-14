import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSText from '@/components/ui/text/CSText'
import { getExperienceData } from '@/lib/data'
import BannerSection from '@/components/ui/section/BannerSection'
import Link from 'next/link'
import SwiperSlider from '@/components/swiper/SwiperSlider'
import clsx from 'clsx'
import CSSpan from '@/components/ui/span/CSSpan'

const Experience = () => {
  const data = getExperienceData()

  return (
    <>
      <BannerSection image_url={data.banner.banner_image}>
        <div className="lg-[6.2rem] absolute inset-0 flex  flex-col justify-center pl-[5.2rem] xl:pl-[6.2rem]">
          <CSText size="35" color="white" weight="bold">
            {data.banner.title}
          </CSText>
          <CSText
            size="18"
            color="white"
            className="mt-[1.7rem] w-[29rem] lg:w-[38rem] xl:w-full xl:whitespace-pre-line"
          >
            {data.banner.intro}
          </CSText>
        </div>
      </BannerSection>
      <div className="mx-auto mt-[6.3rem] max-w-[128rem] px-[3.5rem] xl:px-[9rem]">
        <CSText size="21" weight="bold" color="white">
          실시간 인기체험
        </CSText>
        <div className="mt-[1.8rem] hidden w-full grid-cols-2 gap-x-[2.4rem] gap-y-[3rem] pb-[9rem] md:grid-cols-3 xl:grid xl:gap-y-[5rem]">
          {data.contents.map((value, index) => (
            <>
              {index < 3 && (
                <Link href={value.path} key={index}>
                  <div className="relative cursor-pointer">
                    <div>
                      <AutoSizeImage src={value.thumbnail} full />
                    </div>
                    <div className="mt-[-0.1rem] flex w-full gap-[1.1rem] bg-transparent py-[0.9rem] xl:py-[1.3rem]">
                      <div className="flex items-center">
                        <CSText weight="bold" size="35" color="white">
                          {index + 3}
                        </CSText>
                        <CSText
                          size="16"
                          color="white"
                          className="ml-[0.8rem] mt-[1rem]"
                        >
                          랩키드 시즌{index + 3}_
                        </CSText>
                        <CSSpan
                          size="16"
                          weight="bold"
                          className="mt-[1rem]"
                          color="white"
                        >
                          {value.title}
                        </CSSpan>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </>
          ))}
        </div>
        <div className="mt-[1.8rem] xl:hidden">
          <SwiperSlider contents={data.contents} />
        </div>
        <CSText size="21" weight="bold" color="white" className="mt-[5.4rem]">
          전체보기
        </CSText>
        <div className="mt-[1.8rem] grid w-full grid-cols-2 gap-x-[2.4rem] gap-y-[3rem] pb-[9rem] lg:grid-cols-3 ">
          {data.contents.map((value, index) => (
            <Link href={value.path} key={index}>
              <div className="relative cursor-pointer">
                <div className="absolute z-10 h-full w-full ">
                  <div
                    className={clsx(
                      'grid h-full w-full place-items-center rounded-[1rem] ',
                      index > 2 && 'bg-black/70',
                    )}
                  >
                    <div>
                      <CSText
                        size="16"
                        color="white"
                        className={clsx('text-center', index > 2 && 'hidden')}
                      >
                        Season{index + 3}
                      </CSText>
                      <CSText
                        size={index > 2 ? '12' : '18'}
                        weight={index > 2 ? 'normal' : 'bold'}
                        color="white"
                      >
                        {index > 2 ? '서비스 준비중 입니다' : value.title}
                      </CSText>
                    </div>
                  </div>
                </div>

                <div>
                  <AutoSizeImage src={value.thumbnail} full rounded="10" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Experience
