'use client'

import { TCourse } from '@/utils/types'
import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'
import CSText from '../ui/text/CSText'
import { signCourse } from '@/app/api/post'
import CSButton from '../ui/button/CSButton'

interface TProps {
  course: TCourse
  registeredCourse?: boolean
}

const LectureContent = ({ course, registeredCourse }: TProps) => {
  const registerCourse = async () => {
    if (course.video_uid) {
      const result = await signCourse(course.video_uid)
      const data = await result.json()
      if (data.result === 1001) return alert('이미 수강 신청한 강좌 입니다.')
      alert(
        '수강 신청이 완료 되었습니다.\n마이페이지의 나의 강좌에서 확인하실 수 있습니다.',
      )
    } else {
      alert('해당 강의는 준비중 입니다.')
    }
  }
  return (
    <>
      <CSText size="24" color="black" weight="bold" className="lg:line-clamp-4">
        {course.title}
      </CSText>
      <CSText size="15" color="494949" className="mt-[2rem] lg:mt-[1.6rem]">
        {course.title}
      </CSText>
      <div className="hidden gap-[1.4rem] lg:mt-[1.6rem] lg:flex lg:flex-col lg:gap-[0.5rem]">
        <div className="flex gap-[0.5rem]">
          <AutoSizeImage
            src={'/images/favorite.png'}
            className="h-[2rem] w-[2rem]"
          />
          <CSText size="14" color="7D7D7D">
            좋아요
          </CSText>
        </div>
        <div className="flex gap-[0.3rem]">
          <AutoSizeImage
            src={'/images/share.png'}
            className="h-[2rem] w-[2rem]"
          />
          <CSText size="14" color="7D7D7D">
            공유
          </CSText>
        </div>
      </div>
      <div className="mt-[2rem] flex items-center gap-[2.3rem] lg:mt-[8rem] lg:flex-col lg:items-start lg:gap-[0.6rem]">
        <div className="flex gap-2 lg:order-1">
          <AutoSizeImage
            src={'/images/star.png'}
            className="h-[2rem] w-[2rem]"
          />
          <CSText size="15" color="black">
            4.8 (22)
          </CSText>
        </div>
      </div>
      <div className="mt-[2.3rem] flex items-end gap-[2.6rem]">
        {!registeredCourse && (
          <CSButton
            width="215"
            height="45"
            bgColor="00A886"
            size="24"
            color="white"
            rounded="5"
            onClick={registerCourse}
          >
            수강신청
          </CSButton>
        )}
        <div className="flex gap-[1.4rem] lg:hidden">
          <div className="flex gap-[0.3rem]">
            <AutoSizeImage
              src={'/images/favorite.png'}
              className="h-[2rem] w-[2rem]"
            />
            <CSText size="14" color="7D7D7D">
              좋아요
            </CSText>
          </div>
          <div className="flex gap-[0.3rem]">
            <AutoSizeImage
              src={'/images/share.png'}
              className="h-[2rem] w-[2rem]"
            />
            <CSText size="14" color="7D7D7D">
              공유
            </CSText>
          </div>
        </div>
      </div>
    </>
  )
}

export default LectureContent
