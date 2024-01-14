import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  className?: string
}

const CSLabel = ({ children, className }: Props) => {
  return <label className={clsx('relative', className)}>{children}</label>
}

export default CSLabel
