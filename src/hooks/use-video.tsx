'use client'

import { updateCourse } from '@/app/api/post'
import { useRef, useEffect, useState, useCallback } from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import 'video.js/dist/video-js.css'

interface VideoProps {
  videoTarget: HTMLElement | null
  options?: VideoJsPlayerOptions
  plugins?: string[]
  uid: string
  registeredCourse?: boolean
}

const DEFAULT_OPTIONS: VideoJsPlayerOptions = {}

/**
 * video js 사용을 위한 커스텀 훅
 * @param  [options]
 *         video js options
 * @param {Array} [plugins]
 *         string array for video js plugins,
 * @param {Node} [videoTarget]
 *                video js DOM Element
 * @returns {Object} { player: videojs player }
 */

const useVideo = ({
  options,
  videoTarget,
  plugins = [],
  uid,
  registeredCourse,
}: VideoProps) => {
  const [totalTime, setTotalTime] = useState<number>(0)

  const currentTime =
    typeof window !== 'undefined' ? Number(localStorage.getItem(uid)) : 0

  const playerRef = useRef<VideoJsPlayer | null>(null)

  const initializeVideo = () => {
    if (videoTarget === null) return

    const videoElement = document.createElement('video-js')
    videoElement.classList.add('vjs-fill')
    videoTarget.appendChild(videoElement)

    const player = (playerRef.current = videojs(
      videoElement,
      { ...DEFAULT_OPTIONS, ...options },
      () => {
        plugins.forEach((plugin) => {
          // eslint-disable-next-line no-prototype-builtins
          if (player.hasOwnProperty(plugin)) {
            ;(player as any)[plugin]()
          } else {
            videojs.log.warn(`${plugin} plugin not found`)
          }
        })
        // 이 부분에서 timeupdate 이벤트 리스너 등록
        player.on('timeupdate', handleTimeUpdate)
        player.ready(function () {
          player.currentTime(Number(localStorage.getItem(uid)))
        })
        player.on('loadedmetadata', handletotalDuration)
      },
    ))
  }

  // const updateCourseDate = useCallback(async () => {
  //   if (uid) {
  //     await updateCourse(uid, totalTime, currentTime)
  //   }
  // }, [uid, totalTime, currentTime])

  // useEffect(() => {
  //   const handleWindowLoad = async () => {
  //     // window.load 이벤트 발생 시 실행
  //     await updateCourseDate()
  //   }

  //   // 처음 로드될 때 실행
  //   updateCourseDate()

  //   // window.load 이벤트 리스너 등록
  //   window.addEventListener('unload', handleWindowLoad)

  //   // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener('unload', handleWindowLoad)
  //   }
  // }, [updateCourseDate])

  // loadedmetadata 이벤트 핸들러
  const handletotalDuration = () => {
    // Get the total duration of the video
    if (playerRef.current) {
      const totalDuration = playerRef.current?.duration()
      setTotalTime(totalDuration)
      if (!registeredCourse) {
        playerRef.current.duration(60)
      }
      //preivew 길이 제한
    }
  }

  // timeupdate 이벤트 핸들러
  const handleTimeUpdate = () => {
    // 비디오의 현재 재생 시간을 가져옵니다.
    const currentTime = playerRef.current?.currentTime()
    localStorage.setItem(uid, String(currentTime))
  }

  const playerCleanUp = (cb?: () => void) => {
    const player = playerRef.current
    if (player && !player.isDisposed()) {
      player.dispose()
      playerRef.current = null
      if (cb) cb()
    }
  }

  const playerReset = () => {
    playerCleanUp()
    initializeVideo()
  }

  useEffect(() => {
    // 초기 video.js initialize
    if (!playerRef.current) {
      initializeVideo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, videoTarget])

  useEffect(() => {
    // player clean up
    return () => {
      playerCleanUp()
    }
  }, [playerRef])

  return {
    player: playerRef.current,
    playerReset,
  }
}

export default useVideo
