import Card from '@/components/card/Card'
import DigitalSwiperSlider from '@/components/swiper/DigitalSwiperSlider'
import CSText from '@/components/ui/text/CSText'
import { getCareerCounseling } from '@/lib/data'

const CareerCounselignPage = () => {
  const data = getCareerCounseling()

  return (
    <main className="mx-auto mt-[8.4rem] w-full max-w-[140rem]">
      <DigitalSwiperSlider careerCounseling />
      <section className="relative mt-[4rem] h-auto w-full bg-[#E6E6E6] px-[4.8rem] py-[6rem]">
        <CSText size="31" color="black" weight="bold">
          진로상담 심리란 무엇인가?
        </CSText>
        <CSText
          size="18"
          color="black"
          className="mt-[2rem] whitespace-pre-line"
        >
          {
            '진로상담 심리는 개인의 흥미, 능력, 가치관 등을 고려하여 적절한 진로를 찾는 과정을 의미합니다. \n이는 학생들이 자기 이해를 통해 진로 선택에 대한 명확한 방향을 찾고, 자아실현과 성취감을 얻을 수 있도록 도움을 주는 심리적인 지원 활동입니다. \n진로상담 심리는 학업, 직업, 삶의 목표 설정에 관련된 다양한 측면을 고려하여 진로 결정을 지원합니다.'
          }
        </CSText>
      </section>
      <section className="mx-auto mt-[4rem] w-full max-w-[140rem]">
        <CSText size="31" color="white" weight="bold" className="mt-[4rem]">
          진로상담심리 캠퍼스
        </CSText>
        <section className="grid grid-cols-4 gap-12 py-[4rem]">
          {data.map((content, index) => (
            <Card key={index} content={content} />
          ))}
        </section>
      </section>
    </main>
  )
}

export default CareerCounselignPage
