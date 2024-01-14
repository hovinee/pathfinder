import mongoose, { models, Schema, Types } from 'mongoose'

import { CommentModel, GetCommentsResponse } from '@/models/comment'

export interface FeedModel {
  author: Types.ObjectId
  authorType: string
  message: string
  comments?: Types.ObjectId[]
  likeGivers?: Types.ObjectId[]
  world: string
}

export interface FeedDoc extends FeedModel, mongoose.Document {
  createdAt: Date
}

export type AddFeedDTO = Omit<
  FeedModel,
  'author' | 'authorType' | 'likeGivers' | 'comments' | 'isLike'
>

export interface DeleteFeedDTO {
  id: string
}

interface UpdateFeedDTO {
  id: string
}

export interface UpdateFeedMsgDTO extends UpdateFeedDTO {
  message: string
}

export interface UpdateFeedLikeDTO extends UpdateFeedDTO {
  isLike: boolean
}

export interface FeedResponse {
  id: string
  author: string
  authorType: string
  message: string
  comments: GetCommentsResponse[]
  likeCount: number
  isLike: boolean
  createdAt: string
  //updatedAt: string
  isMine: boolean
}

const feedSchema = new Schema<FeedModel>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    authorType: {
      type: String,
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
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'comment',
      required: false,
    },
    world: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

feedSchema.index({ email: 1 })

const Feed =
  models.feed || mongoose.model<FeedModel>('feed', feedSchema, 'feed')

export default Feed
