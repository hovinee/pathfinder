'use client'

/* eslint-disable react/display-name */
import useVideo from '@/hooks/use-video'
import clsx from 'clsx'
import React, { CSSProperties, useRef, useEffect, useState } from 'react'
import { VideoJsPlayerOptions } from 'video.js'
import './styles.css'

interface VideoProps {
  sources: VideoJsPlayerOptions['sources'] | any
  styles?: CSSProperties
  videoOptions?: Omit<VideoJsPlayerOptions, 'sources'>
  uid: string
  registeredCourse?: boolean
}

const Video = React.forwardRef<HTMLDivElement | null, VideoProps>(
  ({ sources, styles, videoOptions, uid, registeredCourse }, refs) => {
    const videoRef = useRef<HTMLDivElement | null>(null)
    const [target, setTarget] = useState<HTMLDivElement | null>(
      videoRef.current,
    )
    const { player, playerReset } = useVideo({
      videoTarget: target,
      options: { sources, ...videoOptions },
      uid,
      registeredCourse,
    })

    useEffect(() => {
      if (player) playerReset()
    }, [sources, player, playerReset])

    useEffect(() => {
      if (videoRef.current) {
        setTarget(videoRef.current)
        playerReset()
      }
    }, [videoRef, playerReset])

    return (
      <div ref={refs}>
        <div ref={videoRef} style={styles} className="test" />
      </div>
    )
  },
)

export default Video
