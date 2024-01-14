import Database from '@/utils/database'

import { Schema, Types, UpdateQuery } from 'mongoose'
import Feed, { FeedModel } from '@/models/feed'

export const getFeeds = async (world: string) => {
  await Database.getInstance()
  return await Feed.find({ world: world })
    .select('-__v')
    .populate('author', 'name')
    .populate({
      path: 'comments',
      populate: { path: 'author', select: 'name' },
    })
}

export const findFeedById = async (id: Types.ObjectId | string) => {
  await Database.getInstance()
  return await Feed.findOne({ _id: id })
}

export const findFeedByCommentId = async (id: string) => {
  await Database.getInstance()
  return await Feed.findOne({ comments: id })
}

export const findFeedByAuthorWorld = async (
  author: Schema.Types.ObjectId,
  world: string,
) => {
  await Database.getInstance()
  return await Feed.findOne({ author: author, world: world })
}

export const insertFeed = async (feed: FeedModel) => {
  await Database.getInstance()
  return await new Feed({ ...feed }).save()
}

export const updateFeed = async (
  id: Types.ObjectId | string,
  update: UpdateQuery<any>,
) => {
  await Database.getInstance()
  return await Feed.findByIdAndUpdate({ _id: id }, update, {
    new: true,
  })
}

export const deleteFeedById = async (id: Types.ObjectId | string) => {
  await Database.getInstance()
  return await Feed.findByIdAndDelete({ _id: id })
}
