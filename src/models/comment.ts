import mongoose, { models, Schema, Types } from 'mongoose'
import { UserModel } from '@/models/user'
import { ObjectId } from 'bson'

export interface CommentModel {
  author: Types.ObjectId
  message: string
  likeGivers: Types.ObjectId[]
}

export interface CommentDoc
  extends Omit<CommentModel, 'author'>,
    mongoose.Document {
  author: { _id: ObjectId; name: string }
  createdAt: Date
}

export interface CommentResponse {}

export interface AddCommentDTO {
  id: string
  message: string
}

interface UpdateCommentDTO {
  id: string
}

export interface UpdateCommentMsgDTO extends UpdateCommentDTO {
  message: string
}

export interface UpdateCommentLikeDTO extends UpdateCommentDTO {
  isLike: boolean
}

export interface DeleteCommentDTO {
  id: string
}

export interface GetCommentsResponse {
  id: string
  author: string
  message: string
  likeCount: number
  isLike: boolean
  createdAt: string
  //updatedAt: string
  isMine: boolean
}

export const commentSchema = new Schema<CommentModel>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    likeGivers: {
      type: [Schema.Types.ObjectId],
      ref: 'user',
      required: false,
    },
  },
  { timestamps: true },
)

const Comment =
  models.comment ||
  mongoose.model<CommentModel>('comment', commentSchema, 'comment')

export default Comment
