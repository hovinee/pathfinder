import LabKidContents from '@/components/labkid/LabKidContents'
import BannerSection from '@/components/ui/section/BannerSection'
import CSText from '@/components/ui/text/CSText'
import { getLabKidBySlug } from '@/lib/data'

const LabKid = ({ params }: any) => {
  const data = getLabKidBySlug(params.slug)

  return (
    <>
      <BannerSection image_url={data.banner.banner_image}>
        <div className="absolute inset-0 flex flex-col items-center justify-end whitespace-pre-line pb-[7.2rem]">
          <CSText size="35" color="white" weight="bold">
            {data.banner.season[0]} {data.banner.title}
          </CSText>
          <CSText size="18" color="white" className="mt-[1.1rem] text-center">
            {data.banner.intro}
          </CSText>
        </div>
      </BannerSection>
      <LabKidContents contents={data.contents} season={data.banner.season[1]} />
    </>
  )
}

export default LabKid
