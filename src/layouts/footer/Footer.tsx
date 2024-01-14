import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSButton from '@/components/ui/button/CSButton'

import CSText from '@/components/ui/text/CSText'
import { getFooterData } from '@/lib/data'

const Footer = () => {
  const data = getFooterData()

  return (
    <footer className="w-full px-[2rem] pb-[5.5rem] pt-[5.2rem] text-white lg:px-[3.5rem] xl:mx-auto xl:w-[130.8rem] xl:px-0 xl:pb-[4.9rem]">
      <CSText size="12" color="727272">
        고객센터
      </CSText>
      <CSText size="12" color="9F9F9F" className="mt-[0.6rem]">
        오전 10시 - 오후 6시 (주말 공휴일 제외)
      </CSText>
      <CSButton
        className="mt-[1.1rem]"
        width="85"
        height="25"
        bgColor="D9D9D9"
        size="12"
        color="6A6A6A"
        rounded="5"
      >
        문의하기
      </CSButton>
      <div className="mt-[5.1rem] flex gap-[1.8rem] lg:flex-col lg:gap-0">
        <CSText size="12 xl:14" color="9F9F9F" className=" whitespace-pre-line">
          {`서울특별시 마포구 성암로 330, 5층 517호 (상암동, 디엠씨첨단산업센터)\n경기도 수원시 영통구 광교로 156, 7층 710호 (광교비즈니스센터)`}
        </CSText>

        <CSText size="12 xl:14" color="9F9F9F" className="whitespace-pre-line">
          {`Tel: 02-305-5002\nEmail: ceo@ducowise.com / david@ducowise.com`}
        </CSText>
      </div>
      <div className="mt-[0.6rem] flex w-full flex-col lg:mt-[4.6rem]">
        <CSText size="12 xl:14" color="9F9F9F">
          {`© 저작권보호 2019 주식회사 듀코젠사업자등록번호: 655-87-00359`}
        </CSText>
        <div className="mt-[1.1rem] flex gap-1">
          <div className="flex h-[2.67rem] w-[5rem] items-center">
            <AutoSizeImage src={data.meta} className="h-[1.1rem] w-[5rem]" />
          </div>
          <AutoSizeImage
            src={'/images/footer/apple.png'}
            className="h-[2.67rem] w-[7.5rem]"
          />
          <AutoSizeImage src={data.google} className="h-[2.67rem] w-[9rem]" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
