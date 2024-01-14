import LectureContent from '@/components/lecture-contents/LectureContents'
import LecturePCVideoSection from '@/components/lecture-contents/LecturePCVideoSection'
import LectureVideoSection from '@/components/lecture-contents/LectureVideoSection'
import Tab from '@/components/tab/Tab'
import BannerSection from '@/components/ui/section/BannerSection'
import { getCourses } from '@/controllers/courseController'
import { getCourseBySlug } from '@/lib/data'

const getCoursesData = async () => {
  const result = await getCourses()
  const data = await result.json()
  return data
}

const Course = async ({ params }: any) => {
  const course = getCourseBySlug(params.slug, 'all')
  const coursesData = await getCoursesData()

  const registeredCourse = coursesData?.data?.some(
    (item: { video_uid: string }) => item.video_uid === course.video_uid,
  )

  return (
    <>
      <BannerSection
        image_url={'/images/lecture/lecture_banner1920.png'}
        lecture
      >
        <LectureVideoSection uid={course.video_uid} />
        <LecturePCVideoSection
          uid={course.video_uid}
          course={course}
          registeredCourse={registeredCourse}
        />
      </BannerSection>
      <div className="mx-auto w-[68rem] lg:w-[95.274rem] xl:w-[97.574rem]">
        <div className="lg:hidden">
          <LectureContent course={course} />
        </div>
        <div className="mt-[6rem] border-t border-[#BFBFBF] lg:hidden" />
        <Tab course={course} />
      </div>
    </>
  )
}

export default Course
