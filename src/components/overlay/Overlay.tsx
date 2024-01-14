import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  progress?: boolean
}

const Overlay = ({ children, progress }: Props) => {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
      <div
        className={clsx(
          'absolute inset-0 bg-black ',
          progress ? 'opacity-0' : 'opacity-20',
        )}
      />
      {children}
    </div>
  )
}

export default Overlay
