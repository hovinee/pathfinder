'use client'

import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'
import CSText from '../ui/text/CSText'
import { motion } from 'framer-motion'
import { TTumbnailContent } from '@/utils/types'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface TProps {
  tumbnailContent: TTumbnailContent[]
  category: number
}

const GridCuration = ({ tumbnailContent, category }: TProps) => {
  const router = useRouter()
  const { data: user } = useSession()

  return (
    <div className="grid grid-cols-4 gap-[1.5rem]">
      {tumbnailContent.map(({ thumbnail_image, title, sub_title }, index) => (
        <div key={index}>
          <div className="cursor-pointer">
            <div className="w-full overflow-hidden rounded-[1rem]">
              <motion.div
                key={index}
                className="h-full cursor-pointer rounded-[1rem] bg-999899"
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  if (user) {
                    router.push(`/select-card/${[category, index]}`)
                  } else {
                    alert('로그인을 하셔야 이용 가능합니다'),
                      router.push('/auth/login')
                  }
                }}
              >
                <AutoSizeImage src={thumbnail_image[0]} full rounded="10" />
              </motion.div>
            </div>
          </div>
          <div className="h-[8rem] w-full rounded-b-[1rem] pt-[1.5rem]">
            <CSText size="21" color="white" weight="bold">
              {title}
            </CSText>
            <CSText size="14" color="white" className="mt-[0.5rem]">
              {sub_title}
            </CSText>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GridCuration
