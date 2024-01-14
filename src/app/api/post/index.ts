import { AddCommentDTO } from '@/models/comment'
import { AddFeedDTO, UpdateFeedLikeDTO } from '@/models/feed'
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
    const result = await res.json()
    console.log(result)
    return result
  } catch (err: any) {
    console.log(err.message)
  }
}

// 특정 월드의 모든 게시글 조회
export const getFeeds = async () => {
  try {
    var res = await fetch(`${getBaseUrl}/api/get/feeds/?world=train`, {
      method: 'GET',
      cache: 'no-cache',
    })
    const result = await res.json()
    console.log(result)
    return result
  } catch (err: any) {
    console.log(err.message)
  }
}
// 게시글 글 수정
// try {
//   const dto: UpdateFeedMsgDTO = {
//     id: '659bb6141b6fe09194bc1920',
//     message: 'test!!!',
//   }
//   var res = await fetch(`${getBaseUrl}/api/post/update-feed-msg`, {
//     method: 'POST',
//     cache: 'no-cache',
//     headers: headers(),
//     body: JSON.stringify(dto),
//   })
//   console.log(await res.json())
// } catch (err: any) {
//   console.log(err.message)
// }

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
    const result = await res.json()
    console.log(result)
    return result
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
    const result = await res.json()
    console.log(result)
    return result
  } catch (err: any) {
    console.log(err.message)
  }
}

// 댓글 좋아요
// try {
//   const dto: UpdateCommentLikeDTO = {
//     id: '659c9f2e5dcbbf4f22806795',
//     isLike: true,
//   }
//   var res = await fetch(`${getBaseUrl}/api/post/update-comment-like`, {
//     method: 'POST',
//     cache: 'no-cache',
//     headers: headers(),
//     body: JSON.stringify(dto),
//   })
//   console.log(await res.json())
// } catch (err: any) {
//   console.log(err.message)
// }

// 댓글 수정
// try {
//   const dto: UpdateCommentMsgDTO = {
//     id: '659c9f2e5dcbbf4f22806795',
//     message: 'asdkjflkasdjfklasjkdlfjklas',
//   }
//   var res = await fetch(`${getBaseUrl}/api/post/update-comment-msg`, {
//     method: 'POST',
//     cache: 'no-cache',
//     headers: headers(),
//     body: JSON.stringify(dto),
//   })
//   console.log(await res.json())
// } catch (err: any) {
//   console.log(err.message)
// }

// 댓글 삭제
// try {
//   const dto: DeleteCommentDTO = {
//     id: '659ca91c5dcbbf4f22806aae',
//   }
//   var res = await fetch(`${getBaseUrl}/api/post/delete-comment`, {
//     method: 'POST',
//     cache: 'no-cache',
//     headers: headers(),
//     body: JSON.stringify(dto),
//   })
//   console.log(await res.json())
// } catch (err: any) {
//   console.log(err.message)
// }

// 게시글 삭제
// try {
//   const dto: DeleteFeedDTO = {
//     id: '659beef58c914035572f7226',
//   }
//   var res = await fetch(`${getBaseUrl}/api/post/delete-feed`, {
//     method: 'POST',
//     cache: 'no-cache',
//     headers: headers(),
//     body: JSON.stringify(dto),
//   })
//   console.log(await res.json())
// } catch (err: any) {
//   console.log(err.message)
// }
