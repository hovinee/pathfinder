import SwiperSlider from '@/components/swiper/SwiperSlider'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import BannerSection from '@/components/ui/section/BannerSection'
import CSText from '@/components/ui/text/CSText'
import { getallCourses } from '@/lib/data'
import clsx from 'clsx'

const Courses = () => {
  const courses = getallCourses(
    ['title', 'intro', 'thumbnail', 'video_uid', 'tag', 'price', 'path'],
    0,
  )

  const category = [
    { title: '프로그래밍', image_url: '/images/category/programming.png' },
    { title: '데이터사이언스', image_url: '/images/category/science.png' },
    { title: '인공지능', image_url: '/images/category/ai.png' },
    { title: '디자인', image_url: '/images/category/design.png' },
    { title: '영상/3D', image_url: '/images/category/video.png' },
    { title: '기획', image_url: '/images/category/plan.png' },
    { title: '마케팅', image_url: '/images/category/marketing.png' },
    { title: '음악', image_url: '/images/category/music.png' },
  ]
  return (
    <>
      <BannerSection image_url={'/images/course/course_banner.png'}>
        <div className="lg-[6.2rem] absolute inset-0 flex flex-col justify-center pl-[5.2rem] xl:pl-[6.2rem]">
          <CSText size="35" color="white" weight="bold">
            LEARN 배움
          </CSText>
          <CSText
            size="18"
            color="white"
            className="mt-[1.7rem] w-[29rem] lg:w-[38rem] xl:w-full xl:whitespace-pre-line"
          >
            {
              '원하는 진로에 맞는 최적의 교육을 만나보세요. \n 다양하고 재밌는 진로 교육 프로그램들이 준비 되어 있습니다.'
            }
          </CSText>
        </div>
      </BannerSection>
      <div className="mt-[6.3rem] px-[7rem] xl:px-[9rem]">
        <SwiperSlider recommend={courses} />
        <div className="mt-[6.3rem]">
          <SwiperSlider rank={courses} />
        </div>
        <div className="mt-[6.3rem]">
          <CSText size="21" weight="bold" color="white" className="font-inter">
            카테고리
          </CSText>
          <div className="mt-[2.5rem] grid grid-cols-4 gap-y-[1.3rem] lg:gap-y-[3rem] xl:gap-y-[5.3rem]">
            {category.map(({ title, image_url }, index) => (
              <div
                key={index}
                className={clsx(
                  'm-auto flex h-[14.8rem] w-[14.8rem] flex-col items-center justify-center bg-EDEDED lg:h-[19.8rem] lg:w-[19.8rem]',
                  index < 3 &&
                    index % 2 === 0 &&
                    'xl:h-[27.2rem] xl:w-[27.2rem]',
                  index > 3 &&
                    index % 2 === 1 &&
                    'xl:h-[27.2rem] xl:w-[27.2rem]',
                )}
              >
                <div className="w-[8.6rem]">
                  <AutoSizeImage src={image_url} full />
                </div>
                <CSText
                  size="18"
                  weight="bold"
                  color="black"
                  className="mt-[0.6rem]"
                >
                  {title}
                </CSText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Courses
