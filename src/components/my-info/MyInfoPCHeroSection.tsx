'use client'

import clsx from 'clsx'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'
import CSText from '../ui/text/CSText'
import { SetStateAction, useState, Dispatch } from 'react'

interface TProps {
  list: string[]
  selectList: number
  setSelectList: Dispatch<SetStateAction<number>>
}

const MyInfoPCHeroSection = ({ selectList, setSelectList, list }: TProps) => {
  return (
    <section className="hidden h-full w-[27.7rem] flex-col  pb-[10rem] lg:flex xl:w-[66.3rem]">
      <div className="flex-1">
        <div className="mt-[8rem] flex items-end justify-center gap-[1.8rem] xl:mr-[14.4rem] xl:justify-end">
          <div className="grid h-[6.1rem] w-[6.1rem] place-items-center rounded-full bg-white">
            <AutoSizeImage
              src={'/images/my_info/my_info_logo.png'}
              className="h-[3.48rem] w-[2.9rem]"
            />
          </div>
          <div className="flex flex-col">
            <CSText
              size="24"
              color="white"
              className="whitespace-pre-line"
              weight="bold"
            >
              안녕하세요,
            </CSText>
            <div className="flex items-baseline gap-[1.5rem]">
              <CSText
                size="24"
                color="white"
                className="whitespace-pre-line"
                weight="bold"
              >
                데비잇님!
              </CSText>
              <AutoSizeImage
                src={'/images/my_info/arrow.png'}
                className="h-[1.1rem] w-[0.7rem]"
              />
            </div>
          </div>
        </div>
        <div className="mt-[6rem] flex flex-col">
          {list.map((value, index) => (
            <div
              className={clsx(
                'ml-auto flex h-[5.1rem] w-[24.2rem] cursor-pointer items-center border-b-2 pl-[7.9rem] hover:border-b-00A886 hover:bg-white xl:w-[34.3rem]',
                selectList === index && 'border-b-00A886 bg-white',
              )}
              key={index}
              onClick={() => setSelectList(index)}
            >
              <CSText
                size="21"
                color={clsx(selectList === index ? 'black' : '7E7E7E')}
                weight={clsx(selectList === index ? 'bold' : 'normal')}
              >
                {value}
              </CSText>
            </div>
          ))}
        </div>
      </div>

      <AutoSizeImage
        src={'/images/my_info/my_info_logoBig.png'}
        className="mx-auto h-[28.2rem] w-[23.5rem] xl:mx-0 xl:ml-[4.4rem]"
      />
    </section>
  )
}

export default MyInfoPCHeroSection
