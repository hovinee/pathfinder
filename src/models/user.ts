import mongoose, { Schema, models } from 'mongoose'

interface Course {
  video_uid: string
  totalTime?: string
  currentTime?: string
}

export interface UserModel {
  name: string
  email: string
  password: string
  isVerified?: boolean
  validationCode?: number
  canLogin?: boolean
  my_course?: Course[]
}

export interface UserDoc extends UserModel, mongoose.Document {}

const userSchema = new Schema<UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    validationCode: {
      type: Number,
      required: false,
      default: 0,
    },
    canLogin: {
      type: Boolean,
      required: false,
    },
    my_course: [
      {
        video_uid: {
          type: String,
          required: true,
        },
        totalTime: {
          type: String,
          required: false,
        },
        currentTime: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true },
)

userSchema.index({ email: 1 })

const User =
  models.user || mongoose.model<UserModel>('user', userSchema, 'user')

export default User
