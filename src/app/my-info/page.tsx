import { getCourses } from '@/controllers/courseController'
import { getallCourses } from '@/lib/data'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import MyInfo from '@/containers/my-info/page'

const getCoursesData = async () => {
  const result = await getCourses()
  const data = await result.json()
  return data
}

const MyInfoPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/')

  const coursesData = await getCoursesData()
  const allCourse = getallCourses(['title', 'path', 'video_uid'])
  const myCourses = allCourse.filter((videoObj) => {
    return coursesData.data.some(
      (course: { video_uid: string }) =>
        course.video_uid === videoObj.video_uid,
    )
  })

  return <MyInfo myCourses={myCourses} />
}

export default MyInfoPage
