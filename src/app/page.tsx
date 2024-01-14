import BannerSection from '@/components/ui/section/BannerSection'
import CSText from '@/components/ui/text/CSText'
import MainArea from '@/containers/main/page'
import { getMainData } from '@/lib/data'

const Main = () => {
  const data = getMainData()

  return (
    <>
      <BannerSection image_url={data.banner.banner_image}>
        <div className="lg-[6.2rem] absolute inset-0 flex flex-col justify-center bg-gradient-to-t from-[#181818] pl-[5.2rem] xl:pl-[6.2rem]">
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
      <MainArea />
    </>
  )
}

export default Main
