import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  className?: string
}

const Section = ({ children, className }: Props) => {
  return (
    <section className={clsx('px-[2.1rem]', className)}>{children}</section>
  )
}

export default Section
