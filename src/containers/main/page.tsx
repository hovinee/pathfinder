'use client'

import GridCuration from '@/components/grid-curation/GridCuration'
import CSText from '@/components/ui/text/CSText'
import {
  thumbnailCommunity,
  thumbnailCounseling,
  thumbnailDiagnosis,
  thumbnailHealing,
} from '@/data/unity/data'
import clsx from 'clsx'
import { useState } from 'react'

const curation = [
  {
    title: '상담 월드',
    description:
      '이 플랫폼은 AI 기반 메타버스 상에서 개인 맞춤형 진로 상담을 제공하고 예비 진로상담 전문가를 위한 교육 및 훈련 프로그램을 제공하여 전문성을 높이고, 이 분야의 전문가를 양성하는 데 중점을 두고 있습니다.\n AI 지능형 내담자와의 대화를 통해, 다양한 상황과 반응에 대한 전문가에게 필요한 대처와 전문적인 지식, 기술 및 태도를 실전같은 시뮬레이션을 통해 전문성을 키울 수 있습니다.',
  },
  {
    title: '힐링 월드',
    description:
      '사용자는 다양한 테마로 구성된 힐링 월드를 통해 내적 휴식과 치유를 경험할 수 있습니다. 이 월드들은 시각적으로 매력적이며, 재미있고 흥미로운 콘텐츠로 가득합니다.\n아름다운 장소, 자연, 공간, 동식물, 음악을 포함한 이 힐링 월드들은 사용자가 직접 조작할 수 있으며, 정기적으로 새로운 테마가 추가되어 사용자의 경험을 더욱 풍부하게 합니다.',
  },
  {
    title: '탐험',
    description:
      '"홀랜드 섬 탈출 메타버스 게임"은 사용자에게 적합한 적성과 진로를 찾는 데 도움을 주는 게임입니다. 이 게임은 홀랜드 직업 선호도 검사 모형인 John Holland의 "Personality-Job Fit" 이론을 근거로 게이미피케이션 설계를 기반 으로 개발되었습니다',
  },
  { title: '커뮤니티', description: '' },
]
const curationCategory = ['전체', '상담 월드', '힐링 월드', '탐험', '커뮤니티']

const MainArea = () => {
  const [category, setCategory] = useState<number>(0)

  return (
    <div className="relative mx-auto mt-[-10rem] rounded-lg px-[9rem] pb-[10rem]">
      <CSText size="21" color="white" weight="bold">
        둘러보기
      </CSText>
      {curationCategory.map((title, index) => (
        <div
          key={index}
          className={clsx(
            'ml-[0.6rem] mt-[1rem] inline-block cursor-pointer rounded-full border border-black p-[1rem]',
            category === index ? 'bg-00A886' : 'bg-white',
          )}
          onClick={() => setCategory(index)}
        >
          <CSText
            size="14"
            className={clsx(
              category === index ? 'text-white' : 'text-[#5E6066]',
            )}
            weight="bold"
          >
            {title}
          </CSText>
        </div>
      ))}
      <div className="mt-[3rem] flex flex-col gap-[6rem]">
        {curation.map(({ title, description }, index) => (
          <>
            {category === 0 && (
              <>
                <div key={index} className="flex flex-col gap-[1.5rem]">
                  <CSText size="18" color="white" weight="bold">
                    {title}
                  </CSText>
                  <CSText
                    size="16"
                    color="white"
                    className="whitespace-pre-line"
                  >
                    {description}
                  </CSText>
                  <GridCuration
                    tumbnailContent={
                      index === 0
                        ? thumbnailCounseling
                        : index === 1
                          ? thumbnailHealing
                          : index === 2
                            ? thumbnailDiagnosis
                            : thumbnailCommunity
                    }
                    category={index}
                  />
                </div>
              </>
            )}
            {category !== 0 && (
              <>
                {category - 1 === index && (
                  <div key={index} className="flex flex-col gap-[1.5rem]">
                    <CSText size="18" color="white" weight="bold">
                      {title}
                    </CSText>
                    <CSText
                      size="16"
                      color="white"
                      className="whitespace-pre-line"
                    >
                      {description}
                    </CSText>
                    <GridCuration
                      tumbnailContent={
                        index === 0
                          ? thumbnailCounseling
                          : index === 1
                            ? thumbnailHealing
                            : index === 2
                              ? thumbnailDiagnosis
                              : thumbnailCommunity
                      }
                      category={index}
                    />
                  </div>
                )}
              </>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

export default MainArea
