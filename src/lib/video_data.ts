export const getVideoData = async (videoUid: string) => {
  const access_token = 'e5b6ec5c7009c55272a1585ffe5af4d0'
  const res = await fetch(
    `https://api.vimeo.com/videos/${videoUid}?fields=uri,name,duration,play`,
    {
      headers: {
        Authorization: `bearer ${access_token}`,
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
    },
  )
  const data = await res.json()
  return data
}
