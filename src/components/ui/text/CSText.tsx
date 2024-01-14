import clsx from 'clsx'

interface Props {
  weight?: string
  size: string
  color?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

interface StringProps {
  [key: string]: string
}

const fontSize: StringProps = {
  '11': 'text-11',
  '12': 'text-12',
  '14': 'text-14',
  '15': 'text-15',
  '16': 'text-16',
  '18': 'text-18',
  '20': 'text-20',
  '21': 'text-21',
  '24': 'text-24',
  '31': 'text-31',
  '35': 'text-35',
  '60': 'text-60',
  '12 xl:14': 'text-12 xl:text-14',
  '12 xl:18': 'text-12 xl:text-18',
  '15 xl:23': 'text-15 xl:text-23',
  '21 xl:31': 'text-21 xl:text-31',
  '37 xl:54': 'text-37 xl:text-54',
}

const fontColor: StringProps = {
  black: 'text-black',
  white: 'text-white',
  red: 'text-red-500',
  C0C0C0: 'text-C0C0C0',
  727272: 'text-727272',
  '9F9F9F': 'text-9F9F9F',
  '6A6A6A': 'text-6A6A6A',
  '00A886': 'text-00A886',
  '7D7D7D': 'text-7D7D7D',
  '8B8B8B': 'text-8B8B8B',
  B8B8B8: 'text-B8B8B8',
  '757575': 'text-757575',
  '494949': 'text-494949',
  '555555': 'text-555555',
  B1B1B1: 'text-B1B1B1',
  787878: 'text-787878',
  565656: 'text-565656',
  '7A7A7A': 'text-7A7A7A',
  '7E7E7E': 'text-7E7E7E',
  DD81FD: 'text-DD81FD',
  FFC700: 'text-FFC700',
  'white hover:D9D9D9': 'text-white hover:text-D9D9D9',
}

const fontWeight: StringProps = {
  normal: 'font-normal', //400
  medium: 'font-medium',
  semiBold: 'font-semibold', //600
  bold: 'font-bold', //700
}

const CSText = ({
  weight,
  size,
  color,
  children,
  className,
  onClick,
}: Props) => {
  return (
    <p
      onClick={onClick}
      className={clsx(
        fontSize[size],
        color && fontColor[color],
        fontWeight[weight ? weight : 'normal'],
        className,
      )}
    >
      {children}
    </p>
  )
}

export default CSText
