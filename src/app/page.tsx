import BannerSection from '@/components/ui/section/BannerSection'
import CSText from '@/components/ui/text/CSText'
import MainArea from '@/containers/main/page'
import { getMainData } from '@/lib/data'

const getImagesData = async () => {
  const res = await fetch(
    'https://api.cloudflare.com/client/v4/accounts/bf5b848ae1de1b815b53a235fd81b2a8/images/v1/153d7ecc-cb5e-4ea7-07a7-1f271c88fb00',
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer KJAAiPRI5OhYWDyBzto2zYcNPoKNdhnkEfenHCpy',
        'Content-Type': 'application/json',
      },
    },
  )
  const data = res.json()
  return data
}

const Main = async () => {
  const data = getMainData()
  return (
    <>
      <BannerSection image_url={data.banner.banner_image}>
        <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-t from-[#181818] pl-[5.2rem] xl:pl-[6.2rem]">
          <CSText size="35" color="white" weight="bold">
            {data.banner.title}
          </CSText>
          <CSText
            size="18"
            color="white"
            className="mt-[1.7rem] whitespace-pre-line"
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
