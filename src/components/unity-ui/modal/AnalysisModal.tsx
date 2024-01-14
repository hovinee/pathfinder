'use client'

import CSText from '@/components/ui/text/CSText'
import { useState, useEffect } from 'react'

const AnalysisModal = () => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots.length === 3 ? '.' : prevDots + '.'))
    }, 500)

    return () => clearInterval(intervalId) // 컴포넌트 언마운트 시 인터벌 클리어
  }, [])
  return (
    <div className="absolute bottom-[3rem] left-0 right-0 mx-auto w-[35rem] rounded-lg bg-black p-[2rem]">
      <CSText size="21" color="white">
        내담자님의 질문을 분석중입니다 {dots}
      </CSText>
    </div>
  )
}

export default AnalysisModal
