import Card from '@/components/card/Card'
import DigitalSwiperSlider from '@/components/swiper/DigitalSwiperSlider'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSText from '@/components/ui/text/CSText'
import { getDigitalLiteracy } from '@/lib/data'
import Link from 'next/link'

const DigitalLiteracyPage = () => {
  const data = getDigitalLiteracy()

  return (
    <main className="mx-auto mt-[8.4rem] w-full max-w-[140rem]">
      <DigitalSwiperSlider />
      <section className="relative mt-[4rem] h-auto w-full bg-[#E6E6E6] px-[4.8rem] py-[6rem]">
        <CSText size="31" color="black" weight="bold">
          디지털 리터러시란 무엇인가?
        </CSText>
        <CSText
          size="18"
          color="black"
          className="mt-[2rem] whitespace-pre-line"
        >
          {
            '디지털 리터러시(Digital Literacy)는 읽기, 쓰기, 기술 및 비판적 사고를 사용하여 디지털 세계를 탐색하는 능력\n입니다. 스마트폰, PC, e-reader 등과 같은 기술을 사용하여 정보를 찾고, 평가하고, 전달합니다. \n인터넷을 효과적으로 탐색하는 데 필요한 기술을 습득할 수 있습니다.'
          }
        </CSText>
      </section>
      <section className="mt-[4rem] grid grid-cols-2 gap-x-[4rem]">
        <div className="relative">
          <AutoSizeImage src="/images/digital-literacy_3.png" full />
          <div className="absolute bottom-0 right-0">
            <CSText size="14" color="white">
              출처: 마이크로소프트
            </CSText>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-[1rem]">
          <CSText size="31" color="white" weight="bold">
            디지털 활용 능력 추천 강좌
          </CSText>
          <CSText size="18" color="white">
            디지털 기술 사용의 기초를 배우고자 하는 기본적인 읽기 능력을 갖춘
            모든 사람을 위한 프로그램입니다. LinkedIn 학습 과정을 시작하세요.
          </CSText>
          <div className="flex gap-[2rem]">
            <Link
              href={
                'https://www.linkedin.com/learning/working-with-computers-and-devices'
              }
            >
              <CSText
                size="18"
                className="cursor-pointer text-[#0067b8] decoration-1 hover:underline"
              >
                {'컴퓨터 작업 >'}
              </CSText>
            </Link>
            <Link
              href={
                'https://www.linkedin.com/learning/working-and-collaborating-online'
              }
            >
              <CSText
                size="18"
                className="cursor-pointer text-[#0067b8] decoration-1 hover:underline"
              >
                {'온라인으로 작업 및 협업 >'}
              </CSText>
            </Link>
          </div>
        </div>
      </section>
      <CSText size="31" color="white" weight="bold" className="mt-[4rem]">
        디지털리터러시 강좌 추천
      </CSText>
      <section className="grid grid-cols-4 gap-12 py-[4rem]">
        {data.map((content, index) => (
          <Card key={index} content={content} />
        ))}
      </section>
    </main>
  )
}

export default DigitalLiteracyPage
