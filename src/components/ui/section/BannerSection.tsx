'use client'

import clsx from 'clsx'
import AutoSizeImage from '../auto-size-image/AutoSizeImage'
import { usePathname } from 'next/navigation'

interface Props {
  children: React.ReactNode
  image_url: string
  lecture?: boolean
}

const BannerSection = ({ children, image_url, lecture }: Props) => {
  const path = usePathname()

  return (
    <section
      className={clsx(
        lecture && 'lg:h-[64rem] xl:h-[64rem]',
        path === '/' ? 'mt-0' : 'mt-[8.4rem]',
        path !== '/' ? 'h-[50rem] xl:h-full' : 'h-[40rem] md:h-full',
      )}
    >
      <div className="relative h-full w-full">
        <AutoSizeImage src={image_url} full objectCover priority />
        {children}
      </div>
    </section>
  )
}

export default BannerSection
