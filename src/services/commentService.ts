import Database from '@/utils/database'

import { Types, UpdateQuery } from 'mongoose'
import Comment, { CommentModel } from '@/models/comment'
import { ObjectId } from 'bson'

export const findCommentById = async (id: Types.ObjectId | string) => {
  await Database.getInstance()
  return await Comment.findOne({ _id: id })
}

export const insertComment = async (comment: CommentModel) => {
  await Database.getInstance()
  return new Comment({ ...comment }).save()
}

export const updateComment = async (id: string, update: UpdateQuery<any>) => {
  await Database.getInstance()
  return Comment.findByIdAndUpdate({ _id: id }, update, {
    new: true,
  })
}

export const deleteCommentById = async (id: string) => {
  await Database.getInstance()
  return Comment.findByIdAndDelete(id)
}

export const deleteCommentsMany = async (ids: string[] | ObjectId[]) => {
  await Database.getInstance()
  return await Comment.deleteMany({
    _id: { $in: ids },
  })
}
