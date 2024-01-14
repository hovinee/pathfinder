import { TDigitalLiteracy } from '@/utils/types'
import Link from 'next/link'

interface Props {
  content: TDigitalLiteracy
}

const Card = ({ content }: Props) => {
  return (
    <article className="w-full overflow-hidden rounded bg-white shadow-lg hover:opacity-80">
      <Link href={content.url} className="relative">
        <img
          className="w-full"
          src={content.thumbnail}
          alt="Sunset in the mountains"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg height="auto" version="1.1" viewBox="0 0 68 48" width="4rem">
            <path
              className="ytp-large-play-button-bg"
              d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
              fill="#f00"
            />
            <path d="M 45,24 27,14 27,34" fill="#fff" />
          </svg>
        </div>
      </Link>

      <div className="px-6 py-4">
        <div className="mb-2 text-16 font-bold">{content.title}</div>
        <p className="text-14 text-gray-700">{content.intro}</p>
        <p className="mt-[1rem] text-14 text-[#31369c]">
          출저: 유튜브{' '}
          <Link href={content.url}>
            <span className="text-decoration: underline hover:text-transparent/70">
              바로가기
            </span>
          </Link>
        </p>
      </div>

      <div className="px-6 pb-2 pt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-lg font-semibold text-gray-700">
          #ai
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-lg font-semibold text-gray-700">
          #future
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-lg font-semibold text-gray-700">
          #education
        </span>
      </div>
    </article>
  )
}

export default Card
