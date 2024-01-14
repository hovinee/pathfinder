import { getVideoData } from '@/lib/video_data'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'
import Video from '../ui/video/Video'

const args = {
  styles: {
    width: '100%',
    aspectRatio: '16 / 9',
  },
  videoOptions: {
    controls: true,
    autoplay: false,
  },
}

interface TProps {
  uid: string
}

const LectureVideoSection = async ({ uid }: TProps) => {
  const data = await getVideoData(uid)

  const videoSource = {
    src: data?.play?.hls?.link,
    type: 'application/x-mpegURL',
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center lg:hidden">
      <div className="relative grid h-[38.6rem] w-[68rem] place-items-center">
        <AutoSizeImage
          src={'/images/lecture/lecture_banner_inner.png'}
          className="h-full w-full"
          priority
        />

        <div className="absolute inset-0 m-auto h-[36.3rem] w-[64.3rem]">
          <Video {...args} sources={videoSource} uid={uid} />
        </div>
      </div>
    </div>
  )
}

export default LectureVideoSection
