import {AddCommentDTO, DeleteCommentDTO, UpdateCommentLikeDTO, UpdateCommentMsgDTO} from '@/models/comment'
import {AddFeedDTO, DeleteFeedDTO, UpdateFeedLikeDTO, UpdateFeedMsgDTO} from '@/models/feed'
import { getBaseUrl } from '@/utils/url'

export const signCourse = async (uid: string): Promise<Response> => {
  const customHeaders = new Headers()
  customHeaders.append(
    'X-Custom-Auth-Key',
    process.env.NEXT_PUBLIC_WORKER_AUTH_KEY!,
  )
  customHeaders.append('Content-Type', 'application/json')
  return await fetch(`${getBaseUrl}/api/post/sign-course?uid=${uid}`, {
    method: 'POST',
    headers: customHeaders,
    cache: 'no-cache',
  })
}

export const updateCourse = async (
  uid: string,
  totalTime: number,
  currentTime: number,
): Promise<Response> => {
  const customHeaders = new Headers()
  customHeaders.append(
    'X-Custom-Auth-Key',
    process.env.NEXT_PUBLIC_WORKER_AUTH_KEY!,
  )
  customHeaders.append('Content-Type', 'application/json')
  return await fetch(`${getBaseUrl}/api/post/update-course`, {
    method: 'POST',
    headers: customHeaders,
    cache: 'no-cache',
    body: JSON.stringify({
      uid: uid,
      totalTime: totalTime,
      currentTime: currentTime,
    }),
  })
}

//특정 월드에 게시글 작성
export const writeFeed = async (param: string) => {
  try {
    const { world, message } = JSON.parse(param)
    const dto: AddFeedDTO = { world: world, message: message }
    var res = await fetch(`${getBaseUrl}/api/post/new-feed`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(dto),
    })
    return res
  } catch (err: any) {
    console.log(err.message)
  }
}

// 특정 월드의 모든 게시글 조회
export const getFeeds = async (world: string) => {
  try {
    var res = await fetch(`${getBaseUrl}/api/get/feeds?world=${world}`, {
      method: 'GET',
      cache: 'no-cache',
    })
    return res
  } catch (err: any) {
    console.log(err.message)
  }
}
// 게시글 글 수정
export const updateFeedMsg = async (param: string) => {
  try {
    const { id, message } = JSON.parse(param)
    const dto: UpdateFeedMsgDTO = {
      id: id,
      message: message,
    }
    var res = await fetch(`${getBaseUrl}/api/post/update-feed-msg`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(dto),
    })
    return res
  } catch (err: any) {
    console.log(err.message)
  }
}

// 게시글 좋아요 수정
export const updateFeedLike = async (param: string) => {
  try {
    const { id, isLike } = JSON.parse(param)
    const dto: UpdateFeedLikeDTO = {
      id: id,
      isLike: isLike,
    }
    var res = await fetch(`${getBaseUrl}/api/post/update-feed-like`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(dto),
    })
    return res
  } catch (err: any) {
    console.log(err.message)
  }
}

// 댓글 작성
export const writeComment = async (param: string) => {
  try {
    const { id, message } = JSON.parse(param)
    const dto: AddCommentDTO = {
      id: id,
      message: message,
    }
    var res = await fetch(`${getBaseUrl}/api/post/new-comment`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(dto),
    })
    return res
  } catch (err: any) {
    console.log(err.message)
  }
}

// 댓글 좋아요
export const updateCommentLike = async (param: string) => {
  try {
    const {id, isLike} = JSON.parse(param)
    const dto: UpdateCommentLikeDTO = {
      id: id,
      isLike: isLike,
    }
    var res = await fetch(`${getBaseUrl}/api/post/update-comment-like`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(dto),
    })
    return res
  } catch (err: any) {
    console.log(err.message)
  }
}

// 댓글 수정
export const updateCommentMsg = async (param: string) => {
  try {
    const {id, message} = JSON.parse(param)
    const dto: UpdateCommentMsgDTO = {
      id: id,
      message: message,
    }
    var res = await fetch(`${getBaseUrl}/api/post/update-comment-msg`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(dto),
    })
    return res
  } catch (err: any) {
    console.log(err.message)
  }
}

// 댓글 삭제
export const deleteComment = async (param: string) => {
  try {
    const {id} = JSON.parse(param)
    const dto: DeleteCommentDTO = {
      id: id,
    }
    var res = await fetch(`${getBaseUrl}/api/post/delete-comment`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(dto),
    })
    return res
  } catch (err: any) {
    console.log(err.message)
  }
}

// 게시글 삭제
export const deleteFeed = async (param: string) => {
  try {
    const {id} = JSON.parse(param)
    const dto: DeleteFeedDTO = {
      id: id,
    }
    var res = await fetch(`${getBaseUrl}/api/post/delete-feed`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(dto),
    })
    return res
  } catch (err: any) {
    console.log(err.message)
  }
}