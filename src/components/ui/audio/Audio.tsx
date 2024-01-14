import useAudio from '@/hooks/use-audio'
import { useEffect, useRef, useState } from 'react'
import AutoSizeImage from '../auto-size-image/AutoSizeImage'
import clsx from 'clsx'

interface TProps {
  audioPath: string
  black?: boolean
}

const Audio = ({ audioPath, black }: TProps) => {
  const { audio, toggle, play, source: url } = useAudio(audioPath)
  const progressRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (audio) {
      const updateProgress = () => {
        setCurrentTime(audio.currentTime)
      }

      const updateProgressBar = () => {
        const progress = (audio.currentTime / audio.duration) * 100
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`
        }
      }

      const handleTimeUpdate = () => {
        updateProgress()
        updateProgressBar()
      }

      const handleLoadedMetadata = () => {
        setDuration(audio.duration || 0)
        updateProgressBar() // 초기에도 프로그래스 바 업데이트
      }

      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [audio])

  useEffect(() => {
    if (url) {
      setDuration(audio.duration || 0)
    }
  }, [url, audio])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressRef.current
    if (progressBar) {
      const rect = progressBar.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const progressBarWidth = progressBar.offsetWidth
      const seekTime = (clickX / progressBarWidth) * audio.duration
      audio.currentTime = seekTime
    }
  }

  return (
    <div className="flex items-center gap-[1rem] py-[1rem] text-white">
      <div className="h-[2.1rem] w-[2.1rem] ">
        <AutoSizeImage
          src={clsx(
            play
              ? black
                ? '/images/test_2.png'
                : '/images/stop.png'
              : black
                ? '/images/test_1.png'
                : '/images/play.png',
          )}
          onClick={toggle}
          full
        />
      </div>

      <div
        className="relative mt-2 h-[0.4rem] cursor-pointer overflow-hidden rounded bg-gray-300 "
        ref={progressRef}
        onClick={handleProgressBarClick}
      >
        <div
          id="progress"
          className={clsx('h-full', black ? 'bg-black' : 'bg-white')}
        />
      </div>
    </div>
  )
}

export default Audio
