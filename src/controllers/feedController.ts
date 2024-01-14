import { NextRequest } from 'next/server'
import ResponseHelper from '@/utils/ResponseHelper'
import { getToken } from 'next-auth/jwt'
import { SessionUser } from '@/utils/types'
import { UserDoc } from '@/models/user'
import { findUserByEmail } from '@/services/userService'
import {
  deleteFeedById,
  findFeedByAuthorWorld,
  findFeedByCommentId,
  findFeedById,
  getFeeds,
  insertFeed,
  updateFeed,
} from '@/services/feedService'
import { validateAddFeedDTO } from '@/utils/validation_back'
import Feed, {
  AddFeedDTO,
  DeleteFeedDTO,
  FeedDoc,
  FeedResponse,
  UpdateFeedLikeDTO,
  UpdateFeedMsgDTO,
} from '@/models/feed'
import { timeAgo } from '@/utils/time'
import mongoose from 'mongoose'
import {
  AddCommentDTO,
  CommentDoc,
  DeleteCommentDTO,
  UpdateCommentLikeDTO,
  UpdateCommentMsgDTO,
} from '@/models/comment'
import {
  deleteCommentById,
  deleteCommentsMany,
  findCommentById,
  insertComment,
  updateComment,
} from '@/services/commentService'

const getJsonData = async (req: NextRequest) => {
  try {
    const reqData = await req.json()
    return reqData
  } catch (_) {
    return null
  }
}

export async function createFeed(req: NextRequest) {
  try {
    const reqData: AddFeedDTO = await getJsonData(req)
    if (!reqData) return ResponseHelper.error('invalid json format')

    const { error } = validateAddFeedDTO(reqData)
    if (error) return ResponseHelper.error(error.message)

    const session = await getToken({ req })
    if (!session) return ResponseHelper.error('session expired')

    const { email } = session as SessionUser
    const user: UserDoc = await findUserByEmail(email)
    if (!user) return ResponseHelper.error('user not found', 404)

    const existFeed = await findFeedByAuthorWorld(user._id, reqData.world)
    if (existFeed) return ResponseHelper.error('feed already exist', 402, 1100)

    const newFeed = await insertFeed({
      author: user._id,
      comments: [],
      authorType: 'user',
      message: reqData.message,
      world: reqData.world,
      likeGivers: [],
    })

    const response: FeedResponse = {
      id: newFeed._id,
      author: user.name,
      authorType: 'user',
      message: reqData.message,
      comments: [],
      likeCount: 0,
      isLike: newFeed.isLike,
      createdAt: timeAgo(newFeed.createdAt.toString()),
      isMine: true,
    }

    return ResponseHelper.success({ data: response })
  } catch (err: any) {
    return ResponseHelper.internalError(err.message)
  }
}

export async function getAllFeed(req: NextRequest) {
  try {
    const world = req.nextUrl.searchParams.get('world')
    if (!world) return ResponseHelper.error('invalid json format')

    const session = await getToken({ req })
    if (!session) return ResponseHelper.error('session expired')

    const { email } = session as SessionUser
    const user: UserDoc = await findUserByEmail(email)
    if (!user) return ResponseHelper.error('user not found', 404)

    const feeds = await getFeeds(world)
    const response: FeedResponse[] = feeds.map((feed) => ({
      id: feed._id,
      author: feed.author.name,
      comments:
        feed.comments?.map((comment: CommentDoc) => ({
          id: comment._id.toString(),
          author: comment.author.name,
          message: comment.message,
          likeCount: comment.likeGivers?.length || 0,
          isLike: comment.likeGivers.includes(user._id),
          createdAt: timeAgo(comment.createdAt.toString()),
          isMine: comment.author._id.toString() === user._id.toString(),
        })) || [],
      message: feed.message,
      authorType: feed.authorType,
      likeCount: feed.likeGivers.length,
      createdAt: timeAgo(feed.createdAt),
      isLike: feed.likeGivers.includes(user._id),
      isMine: feed.author._id.toString() === user._id.toString(),
    }))

    return ResponseHelper.success({ data: response })
  } catch (err: any) {
    return ResponseHelper.internalError(err.message)
  }
}

export async function updateFeedMsg(req: NextRequest) {
  try {
    const reqData: UpdateFeedMsgDTO = await getJsonData(req)
    if (!reqData) return ResponseHelper.error('invalid json format')

    const feedId = new mongoose.Types.ObjectId(reqData.id)
    if (!mongoose.isValidObjectId(feedId))
      return ResponseHelper.error('invalid id format')

    const session = await getToken({ req })
    if (!session) return ResponseHelper.error('session expired')

    const { email } = session as SessionUser

    const user: UserDoc = await findUserByEmail(email)
    if (!user) return ResponseHelper.error('user not found', 404)

    const feed = await findFeedById(feedId)
    if (!feed) return ResponseHelper.error('feed not found', 404)

    const response = await updateFeed(feed._id, reqData)

    return ResponseHelper.success({ data: response.message })
  } catch (err: any) {
    return ResponseHelper.internalError(err.message)
  }
}

export async function updateFeedLike(req: NextRequest) {
  try {
    const reqData: UpdateFeedLikeDTO = await getJsonData(req)
    if (!reqData) return ResponseHelper.error('invalid json format')

    const feedId = new mongoose.Types.ObjectId(reqData.id)
    if (!mongoose.isValidObjectId(feedId))
      return ResponseHelper.error('invalid id format')

    const session = await getToken({ req })
    if (!session) return ResponseHelper.error('session expired')

    const { email } = session as SessionUser

    const user: UserDoc = await findUserByEmail(email)
    if (!user) return ResponseHelper.error('user not found', 404)

    const feed = await findFeedById(feedId)
    if (!feed) return ResponseHelper.error('feed not found', 404)

    const alreadyLiked = feed.likeGivers.includes(user._id)
    const update = reqData.isLike
      ? alreadyLiked
        ? {}
        : { $push: { likeGivers: user._id } }
      : { $pull: { likeGivers: user._id } }

    const response = await updateFeed(feed._id, update)

    return ResponseHelper.success({ data: response.likeGivers.length })
  } catch (err: any) {
    return ResponseHelper.internalError(err.message)
  }
}

export async function createComment(req: NextRequest) {
  try {
    const reqData: AddCommentDTO = await getJsonData(req)
    if (!reqData) return ResponseHelper.error('invalid json format')

    const feedId = new mongoose.Types.ObjectId(reqData.id)
    if (!mongoose.isValidObjectId(feedId))
      return ResponseHelper.error('invalid id format')

    const session = await getToken({ req })
    if (!session) return ResponseHelper.error('session expired')

    const { email } = session as SessionUser

    const user: UserDoc = await findUserByEmail(email)
    if (!user) return ResponseHelper.error('user not found', 404)

    const feed = await findFeedById(feedId)
    if (!feed) return ResponseHelper.error('feed not found', 404)

    const newComment = await insertComment({
      author: user._id,
      message: reqData.message,
      likeGivers: [],
    })

    const updated = await updateFeed(feed._id, {
      $push: { comments: newComment },
    })

    const response: FeedResponse = {
      id: updated._id,
      author: updated.author.name,
      comments:
        updated.comments?.map((comment: CommentDoc) => ({
          id: updated._id.toString(),
          author: updated.author.name,
          message: updated.message,
          likeCount: updated.likeGivers?.length || 0,
          isLike: updated.likeGivers.includes(user._id),
          createdAt: timeAgo(updated.createdAt.toString()),
          isMine: updated.author._id.toString() === user._id.toString(),
        })) || [],
      message: updated.message,
      authorType: updated.authorType,
      likeCount: updated.likeGivers.length,
      createdAt: timeAgo(updated.createdAt),
      isLike: updated.likeGivers.includes(user._id),
      isMine: updated.author._id.toString() === user._id.toString(),
    }

    return ResponseHelper.success({ data: response })
  } catch (err: any) {
    return ResponseHelper.internalError(err.message)
  }
}

export async function updateCommentMsg(req: NextRequest) {
  try {
    const reqData: UpdateCommentMsgDTO = await getJsonData(req)
    if (!reqData) return ResponseHelper.error('invalid json format')

    const commentId = new mongoose.Types.ObjectId(reqData.id)
    if (!mongoose.isValidObjectId(commentId))
      return ResponseHelper.error('invalid id format')

    const session = await getToken({ req })
    if (!session) return ResponseHelper.error('session expired')

    const { email } = session as SessionUser

    const user: UserDoc = await findUserByEmail(email)
    if (!user) return ResponseHelper.error('user not found', 404)

    const comment = await findCommentById(commentId)
    if (!comment) return ResponseHelper.error('comment not found', 404)

    const response = await updateComment(comment._id, reqData)

    return ResponseHelper.success(response.message)
  } catch (err: any) {
    return ResponseHelper.internalError(err.message)
  }
}

export async function updateCommentLike(req: NextRequest) {
  try {
    const reqData: UpdateCommentLikeDTO = await getJsonData(req)
    if (!reqData) return ResponseHelper.error('invalid json format')

    const commentId = new mongoose.Types.ObjectId(reqData.id)
    if (!mongoose.isValidObjectId(commentId))
      return ResponseHelper.error('invalid id format')

    const session = await getToken({ req })
    if (!session) return ResponseHelper.error('session expired')

    const { email } = session as SessionUser

    const user: UserDoc = await findUserByEmail(email)
    if (!user) return ResponseHelper.error('user not found', 404)

    const comment = await findCommentById(commentId)
    if (!comment) return ResponseHelper.error('comment not found', 404)

    const alreadyLiked = comment.likeGivers.includes(user._id)
    const update = reqData.isLike
      ? alreadyLiked
        ? {}
        : { $push: { likeGivers: user._id } }
      : { $pull: { likeGivers: user._id } }

    const response = await updateComment(comment._id, update)

    return ResponseHelper.success({ data: response.likeGivers.length })
  } catch (err: any) {
    return ResponseHelper.internalError(err.message)
  }
}

export async function deleteFeed(req: NextRequest) {
  try {
    const reqData: DeleteFeedDTO = await getJsonData(req)
    if (!reqData) return ResponseHelper.error('invalid json format')

    const session = await getToken({ req })
    if (!session) return ResponseHelper.error('session expired')

    const { email } = session as SessionUser

    const user: UserDoc = await findUserByEmail(email)
    if (!user) return ResponseHelper.error('user not found', 404)

    const feed: FeedDoc = await findFeedById(reqData.id)
    if (!feed) return ResponseHelper.error('feed not found', 404)

    if (feed.comments) await deleteCommentsMany(feed.comments)
    const response = await deleteFeedById(feed._id)
    console.log(response)

    return ResponseHelper.success()
  } catch (err: any) {
    return ResponseHelper.internalError(err.message)
  }
}

export async function deleteComment(req: NextRequest) {
  try {
    const reqData: DeleteCommentDTO = await getJsonData(req)
    if (!reqData) return ResponseHelper.error('invalid json format')

    if (!mongoose.isValidObjectId(reqData.id))
      return ResponseHelper.error('invalid id format')

    const session = await getToken({ req })
    if (!session) return ResponseHelper.error('session expired')

    const { email } = session as SessionUser

    const user: UserDoc = await findUserByEmail(email)
    if (!user) return ResponseHelper.error('user not found', 404)

    const comment = await findCommentById(reqData.id)
    if (!comment) return ResponseHelper.error('comment not found', 404)

    const feed: FeedDoc = await findFeedByCommentId(reqData.id)
    if (!feed)
      return ResponseHelper.error('feed including comment not found', 404)

    await updateFeed(feed._id, {
      $pull: { comments: reqData.id },
    })
    console.log('ok: delete feed')

    const response = await deleteCommentById(reqData.id)
    console.log('ok: delete comment')

    return ResponseHelper.success()
  } catch (err: any) {
    return ResponseHelper.internalError(err.message)
  }
}
