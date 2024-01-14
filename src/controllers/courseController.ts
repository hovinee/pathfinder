import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import ResponseHelper from '@/utils/ResponseHelper'
import { findUserByEmail } from '@/services/userService'
import { SessionUser } from '@/utils/types'
import { UserDoc } from '@/models/user'
import {
  findExistVideoUid,
  findMyCoursesByEmail,
  updateCourseByEmailUid,
  updateSignCourseByEmail,
} from '@/services/courseService'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

const getJsonData = async (req: NextRequest) => {
  try {
    const reqData = await req.json()
    return reqData
  } catch (_) {
    return null
  }
}

// async function createAllCourses(
//   coursesDoc: CourseDoc[],
//   authKey: string,
// ): Promise<AllCoursesResponse[]> {
//   return await Promise.all(
//     coursesDoc.map(async (x: CourseDoc) => {
//       const course: AllCoursesResponse = {
//         courseId: x._id,
//         courseTitle: x.courseTitle,
//         thumbnailImg: '',
//       }
//       course.thumbnailImg = await downloadCourseThumbnail(
//         x.thumbnailImgKey,
//         authKey,
//       )

//       return course
//     }),
//   )
// }

// export const getCourse = async (req: NextRequest) => {
//   try {
//     const id = req.nextUrl.searchParams.get('id')
//     if (!id) return ResponseHelper.error('invalid param')
//     if (!mongoose.isValidObjectId(id))
//       return ResponseHelper.error('invalid id format', 1300)

//     const authKey: string | null = req.headers.get('X-Custom-Auth-Key')
//     if (!authKey) return ResponseHelper.error('auth key required', 401, 1200)

//     // const session = await getToken({ req })
//     // if (!session) return ResponseHelper.error('session expired', 401)

//     // const { email } = session as SessionUser
//     const user = await findUserByEmail('hbyoo@ducowise.com')
//     if (!user) return ResponseHelper.error('user not found', 404)

//     const courseDoc: AuthorPopulatedCourseDoc | null = await findCourseById(id)
//     if (!courseDoc) return ResponseHelper.error('course not found', 404)
//     const course: CourseResponse = await createCourse(courseDoc, authKey)

//     return ResponseHelper.success({ data: course })
//   } catch (err: any) {
//     console.log(err.message)
//     return ResponseHelper.internalError(err.message)
//   }
// }

export async function signCourse(req: NextRequest) {
  try {
    const uid = req.nextUrl.searchParams.get('uid')
    if (!uid) return ResponseHelper.error('invalid param')

    const session = await getToken({ req })
    if (!session) return ResponseHelper.error('session expired')

    const { email } = session as SessionUser

    const user: UserDoc = await findUserByEmail(email)
    if (!user) return ResponseHelper.error('user not found', 404)

    const existVideoUid = await findExistVideoUid(email, uid)

    if (existVideoUid) return ResponseHelper.error('already exist video_uid')

    await updateSignCourseByEmail(email, uid)
    return ResponseHelper.success()
  } catch (err: any) {
    return ResponseHelper.internalError(err.message)
  }
}

export const getCourses = async () => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return ResponseHelper.error('session expired', 401)

    const user = await findUserByEmail(String(session.user?.email))
    if (!user) return ResponseHelper.error('user not found', 404)

    const data = await findMyCoursesByEmail(String(session.user?.email))
    return ResponseHelper.success({ data: data })
  } catch (err: any) {
    console.log(err.message)
    return ResponseHelper.internalError(err.message)
  }
}

export async function updateCourse(req: NextRequest) {
  try {
    const { uid, totalTime, currentTime } = await req.json()

    if (!uid) return ResponseHelper.error('invalid param')

    const session = await getToken({ req })
    if (!session) return ResponseHelper.error('session expired')

    const { email } = session as SessionUser

    const user: UserDoc = await findUserByEmail(email)
    if (!user) return ResponseHelper.error('user not found', 404)

    const res = await updateCourseByEmailUid(
      email,
      uid,
      Number(totalTime),
      Number(currentTime),
    )

    return ResponseHelper.success()
  } catch (err: any) {
    return ResponseHelper.internalError(err.message)
  }
}
