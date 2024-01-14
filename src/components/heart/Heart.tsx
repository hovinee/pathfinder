'use client'

import React, { useState } from 'react'

const FloatingHeart = () => {
  const [floating, setFloating] = useState(false)

  const handleButtonClick = () => {
    setFloating(true)

    // 일정 시간이 지난 후에 floating 상태를 다시 false로 변경
    setTimeout(() => {
      setFloating(false)
    }, 1000)
  }

  return (
    <div className="mt-10 text-center">
      <button
        onClick={handleButtonClick}
        className="rounded bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-700"
      >
        Click me!
      </button>

      {floating && (
        <div className="relative">
          <div className="animate-float absolute">&#10084;</div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 1s ease-in-out infinite;
          font-size: 2rem;
        }
      `}</style>
    </div>
  )
}

export default FloatingHeart
