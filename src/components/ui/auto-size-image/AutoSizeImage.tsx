import clsx from 'clsx'
import Image from 'next/image'

interface Props {
  src: string
  className?: string
  onClick?: () => void
  rounded?: string
  roundedTop?: string
  full?: boolean
  priority?: boolean
  objectCover?: boolean
}

interface StringProps {
  [key: string]: string
}

const borderRadius: StringProps = {
  '10': 'rounded-[1rem]',
  '20': 'rounded-[2rem]',
  '50%': 'rounded-[50%]',
}

const borderTopRadius: StringProps = {
  '6': 'rounded-t-[0.6rem]',
  '10': 'rounded-t-[1rem]',
  18: 'rounded-t-[1.8rem]',
}

const AutoSizeImage = ({
  src,
  className,
  onClick,
  rounded,
  roundedTop,
  full = false,
  priority = false,
  objectCover = false,
}: Props) => {
  return (
    <>
      {full ? (
        <Image
          src={src}
          width={0}
          height={0}
          sizes="100%"
          className={clsx(
            'h-full w-full',
            objectCover && 'object-cover',
            roundedTop && borderTopRadius[roundedTop],
            rounded && borderRadius[rounded],
          )}
          alt=""
          priority={priority}
          onClick={onClick}
          // placeholder="blur"
          // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWNFWDwADjQGvE/U7HAAAAABJRU5ErkJggg=="
        />
      ) : (
        <div className={clsx('relative', className)} onClick={onClick}>
          <Image
            src={src}
            fill
            sizes="100%"
            className={clsx(
              'object-cover',
              rounded && borderRadius[rounded],
              roundedTop && borderTopRadius[roundedTop],
            )}
            alt=""
            priority={priority}
            // placeholder="blur"
            // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWNFWDwADjQGvE/U7HAAAAABJRU5ErkJggg=="
          />
        </div>
      )}
    </>
  )
}

export default AutoSizeImage
