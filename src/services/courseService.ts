import User from '@/models/user'
import Database from '@/utils/database'

export const updateSignCourseByEmail = async (email: string, uid: string) => {
  await Database.getInstance()
  return await User.findOneAndUpdate(
    { email: email },
    { $push: { my_course: { video_uid: uid } } },
    { new: true },
  )
}

export const findExistVideoUid = async (email: string, uid: string) => {
  await Database.getInstance()
  return await User.findOne({
    email: email,
    'my_course.video_uid': uid,
  })
}

export const findMyCoursesByEmail = async (email: string) => {
  await Database.getInstance() // Assuming this is how you initialize your database
  const user = await User.findOne({ email: email })
  return user.my_course
}

export const updateCourseByEmailUid = async (
  email: string,
  uid: string,
  totalTime: number,
  currentTime: number,
) => {
  await Database.getInstance()
  const user = await User.findOne({ email: email })
  const courseIndex = user.my_course.findIndex(
    (course: { video_uid: string }) => course.video_uid === uid,
  )
  // currentTime과 totalTime 업데이트
  user.my_course[courseIndex].currentTime = currentTime
  user.my_course[courseIndex].totalTime = totalTime
  const updatedUser = await user.save()

  return updatedUser
}
