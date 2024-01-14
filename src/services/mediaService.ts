import { cfWorkerUrl } from '@/utils/url'

export const uploadCourseThumbnail = async (
  imgBase64: string,
  key: string,
  authKey: string,
) => {
  return await fetch(`${cfWorkerUrl}/course-thumbnail/${key}`, {
    method: 'PUT',
    headers: {
      'X-Custom-Auth-Key': authKey,
    },
    body: imgBase64,
  })
}

export const downloadCourseThumbnail = async (key: string, authKey: string) => {
  const result = await fetch(`${cfWorkerUrl}/course-thumbnail/${key}`, {
    method: 'GET',
    headers: {
      'X-Custom-Auth-Key': authKey,
    },
  })
  if (result.status == 401) {
    return '401'
  }
  if (result.status == 404) {
    return '404'
  }
  return result.text()
}

export const deleteCourseThumbnail = async (key: string, authKey: string) => {
  return await fetch(`${cfWorkerUrl}/course-thumbnail/${key}`, {
    method: 'DELETE',
    headers: {
      'X-Custom-Auth-Key': authKey,
    },
  })
}
