import CSText from '@/components/ui/text/CSText'
import { memo, useState, useEffect } from 'react'

const Timer = memo(() => {
  const MINUTES_IN_MS = 3 * 60 * 1000
  const INTERVAL = 1000
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS)

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0',
  )
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL)
    }, INTERVAL)

    if (timeLeft <= 0) {
      clearInterval(timer)
      console.log('타이머가 종료되었습니다.')
    }

    return () => {
      clearInterval(timer)
    }
  }, [timeLeft])

  return (
    <CSText size="10" weight="normal" color="00923A">
      {minutes}:{second}
    </CSText>
  )
})

Timer.displayName = 'Timer'

export default Timer
