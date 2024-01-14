'use client'

import { useState, useEffect } from 'react'

interface AudioHook {
  play: boolean
  audio: HTMLAudioElement
  source: string | undefined
  toggle: () => void
}

const useAudio = (audioPath: string): AudioHook => {
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio()) // audio 엘리먼트다
  const [play, setPlay] = useState(false) // 오디오 플레이어의 재생 여부를 나타내는 상태 값이다.
  const [source, setSource] = useState<string | undefined>() // 재생할 오디오 소스 값이다.

  useEffect(() => {
    fetch(audioPath)
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        setSource(url)
        setAudio(new Audio(url))
      })
  }, [])

  useEffect(() => {
    return () => {
      if (source) {
        URL.revokeObjectURL(source)
      }
    }
  }, [source])

  useEffect(() => {
    if (play) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [play, audio])

  const toggle = (): void => setPlay((prev) => !prev)

  return {
    play,
    audio,
    source,
    toggle,
  }
}

export default useAudio
