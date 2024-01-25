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
    <div className="grid grid-cols-1 gap-[1.5rem] border-b pb-[5rem] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tumbnailContent.map(
        ({ thumbnail_image, title, sub_title, path }, index) => (
          <div key={index}>
            <div className="cursor-pointer">
              <div className="w-full overflow-hidden rounded-[1rem]">
                <motion.div
                  key={index}
                  className="relative h-full cursor-pointer rounded-[1rem] bg-999899"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    if (user) {
                      if (!path) {
                        alert('서비스 준비중입니다.')
                      } else {
                        router.push(`/select-card/${[category, index]}`)
                      }
                    } else {
                      alert('로그인을 하셔야 이용 가능합니다'),
                        router.push('/auth/login')
                    }
                  }}
                >
                  <AutoSizeImage src={thumbnail_image[0]} full rounded="10" />
                  {!path && (
                    <div className="absolute inset-0 grid place-items-center bg-181818/50 ">
                      <CSText size="21" color="white" weight="bold">
                        서비스 준비중입니다..
                      </CSText>
                    </div>
                  )}
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
        ),
      )}
    </div>
  )
}

export default GridCuration
