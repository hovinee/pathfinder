'use client'

import Payments from '@/components/payments/Payments'
import CSButton from '@/components/ui/button/CSButton'
import CSText from '@/components/ui/text/CSText'
import clsx from 'clsx'
import { useState } from 'react'

const prices = [
  {
    price: 'Free',
    plan: [
      '치유소 무료 체험 1회 제공',
      '1:1 상담소 무료 체험 1회 제공',
      '직업 선호도 유형 체험',
    ],
  },
  {
    price: 'Basic',
    plan: [
      '치유소 무제한 제공',
      '1:1 상담 무제한 제공',
      '직업 선호도 유형 체험 및 결과지 제공',
    ],
  },
  {
    price: 'Pro',
    plan: [
      '치유소 무제한 제공',
      '1:1 상담 무제한 제공',
      '직업 선호도 유형 체험 및 결과지 제공',
      '이세계 캠퍼스 전 강좌 무제한 수강',
    ],
  },
  {
    price: 'Enterprise',
    plan: [
      '치유소 무제한 제공',
      '1:1 상담, 집단 상담 무제한 제공',
      '직업 선호도 유형 체험 및 결과지 제공',
      '이세계 캠퍼스 전 강좌 무제한 수강',
      '진로체험교육 다운로드 제공',
    ],
  },
]

const Subscirbe = () => {
  const [subscribe, setSubscribe] = useState<boolean>(false)
  return (
    <section className="mt-[8.4rem] px-[1.8rem]">
      <div className="mx-auto max-w-[114rem] py-[8rem]">
        <CSText
          size="31"
          color="white"
          className="font-roboto text-center"
          weight="bold"
        >
          적합한 플랜을 합리적인 가격으로 이용해보세요!
        </CSText>
        <div className="mt-24 grid grid-cols-4 gap-12">
          {prices.map(({ price, plan }, index) => (
            <div
              className={clsx(
                'relative flex h-full min-h-[53.8rem] flex-col rounded-lg bg-white px-[2.6rem] pb-[2.4rem] pt-[4.4rem] shadow-lg',
                price === 'Pro' && 'border border-[#6758ff]',
              )}
              key={index}
            >
              <div className="flex flex-1 flex-col">
                {price === 'Pro' && (
                  <strong className="absolute left-0 right-0 top-0 grid h-[3rem] place-items-center rounded-lg bg-[#f3f2ff] text-14 font-bold text-[#6758ff]">
                    가장 인기있는 옵션👍
                  </strong>
                )}

                <CSText
                  size="31"
                  className={clsx(
                    'font-roboto',
                    price === 'Free' && 'text-[#8c9097]',
                    price === 'Basic' && 'text-[#05b8a2]',
                    price === 'Pro' && 'text-[#6758ff]',
                    price === 'Enterprise' && 'text-[#5e6066]',
                  )}
                  weight="bold"
                >
                  {price}
                </CSText>
                <div className="mt-[2rem] flex items-center gap-[0.5rem]">
                  <CSText
                    size="24"
                    className={clsx(
                      price === 'Free' && 'text-[#8c9097]',
                      price === 'Basic' && 'text-black',
                      price === 'Pro' && 'text-black',
                      price === 'Enterprise' && 'text-[#5e6066]',
                    )}
                    weight="bold"
                  >
                    {price === 'Free' && '무료'}
                    {price === 'Basic' && '5 만원'}
                    {price === 'Pro' && '10 만원'}
                    {price === 'Enterprise' && '도입문의'}
                    {(price === 'Basic' || price === 'Pro') && (
                      <span className="text-16 text-[#8c9097]"> /월</span>
                    )}
                  </CSText>
                </div>
                {(price === 'Basic' || price === 'Pro') && (
                  <div className="flex items-end gap-[0.5rem]">
                    <CSText
                      size="16"
                      className={clsx('text-[#8c9097] line-through')}
                      weight="bold"
                    >
                      {price === 'Basic' && '60 만원'}
                      {price === 'Pro' && '120 만원'}
                    </CSText>

                    <CSText
                      size="21"
                      className={clsx(
                        price === 'Basic' && 'text-[#05b8a2]',
                        price === 'Pro' && 'text-[#6758ff]',
                      )}
                      weight="bold"
                    >
                      {price === 'Basic' && '54 만원'}
                      {price === 'Pro' && '108 만원'}

                      {(price === 'Basic' || price === 'Pro') && (
                        <span className="text-16 text-[#8c9097]">/년</span>
                      )}
                    </CSText>
                  </div>
                )}
              </div>
              <div className="flex flex-1">
                <ul className="mt-[2rem] list-none text-base font-medium leading-normal text-[#5E6066]">
                  <CSText
                    size="14"
                    className=" mb-[0.5rem] text-[#8c9097]"
                    weight="bold"
                  >
                    {`${price} 의 모든 기능 +`}
                  </CSText>
                  {plan.map((value, index) => (
                    <li className="flex items-center gap-[0.5rem]" key={index}>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20.664 5.253a1 1 0 0 1 .083 1.411l-10.666 12a1 1 0 0 1-1.495 0l-5.333-6a1 1 0 0 1 1.494-1.328l4.586 5.159 9.92-11.16a1 1 0 0 1 1.411-.082Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-xl">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-1 flex-col justify-end">
                <CSText
                  size="14"
                  className={clsx('font-roboto text-[#8c9097]')}
                  weight="bold"
                >
                  {price === 'Enterprise' &&
                    'Enterprise 전용 기능은 협의를 통해 선택'}
                </CSText>
                <CSButton
                  className={clsx(
                    'mt-[1.6rem] rounded-lg',
                    price === 'Free' && 'bg-[#f3f5f9]',
                    price === 'Basic' && 'bg-[#05b8a2]',
                    price === 'Pro' && 'bg-[#6758ff]',
                    price === 'Enterprise' && 'bg-[#5e6066]',
                  )}
                  height="50"
                  size="16"
                  color={clsx(price === 'Free' ? 'B8B8B8' : 'white')}
                  weight="bold"
                  onClick={() =>
                    (price === 'Basic' || price === 'Pro') && setSubscribe(true)
                  }
                >
                  {price === 'Free' && '무료로 시작하기'}
                  {(price === 'Basic' || price === 'Pro') && '업그레이드'}
                  {price === 'Enterprise' && '도입문의'}
                </CSButton>
              </div>
            </div>
          ))}
        </div>
        {subscribe && <Payments />}
      </div>
    </section>
  )
}

export default Subscirbe
