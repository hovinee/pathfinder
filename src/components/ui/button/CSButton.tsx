import clsx from 'clsx'
import CSText from '../text/CSText'

interface Props {
  children: React.ReactNode
  className?: string
  width?: string
  height?: string
  bgColor?: string
  color: string
  rounded?: string
  size: string
  weight?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

interface StringProps {
  [key: string]: string
}

const buttonWidth: StringProps = {
  '85': 'w-[8.5rem]',
  '140': 'w-[14rem]',
  '101': 'w-[10.1rem]',
  '184': 'w-[18.4rem]',
  '215': 'w-[21.5rem]',
  '260': 'w-[26rem]',
}

const buttonHeight: StringProps = {
  '25': 'h-[2.5rem]',
  '38': 'h-[3.8rem]',
  '40': 'h-[4rem]',
  '45': 'h-[4.5rem]',
  '50': 'h-[5rem]',
}

const buttonColor: StringProps = {
  '00A886': 'bg-00A886',
  D9D9D9: 'bg-D9D9D9',
  999899: 'bg-999899',
  D1D1D1: 'bg-D1D1D1',
  181818: 'bg-181818',
}

const buttonRounded: StringProps = {
  '5': 'rounded-[0.5rem]',
  '10': 'rounded-[1rem]',
  '13': 'rounded-[1.3rem]',
  '30': 'rounded-[3rem]',
}

const CSButton = ({
  children,
  className,
  width,
  height,
  bgColor,
  color,
  size,
  rounded,
  type,
  weight,
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'grid place-items-center',
        height && buttonHeight[height],
        width ? buttonWidth[width] : 'w-full',
        rounded && buttonRounded[rounded],
        bgColor && buttonColor[bgColor],
        className,
      )}
    >
      <CSText size={size} color={color} weight={weight}>
        {children}
      </CSText>
    </button>
  )
}

export default CSButton
