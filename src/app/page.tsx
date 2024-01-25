import BannerSection from '@/components/ui/section/BannerSection'
import CSText from '@/components/ui/text/CSText'
import MainArea from '@/containers/main/page'
import { getMainData } from '@/lib/data'

const Main = async () => {
  const data = getMainData()
  return (
    <>
      <BannerSection image_url={data.banner.banner_image}>
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#181818] px-[2rem] md:pl-[5.2rem] lg:justify-center xl:pl-[6.2rem]">
          <CSText size="21 md:35" color="white" weight="bold">
            {data.banner.title}
          </CSText>
          <CSText
            size="12 md:18"
            color="white"
            className="mt-[1.7rem] md:whitespace-pre-line"
          >
            {data.banner.intro}
          </CSText>
        </div>
      </BannerSection>
      <MainArea />
    </>
  )
}

export default Main
