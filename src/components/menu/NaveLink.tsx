'use client'

import clsx from 'clsx'
import Anchor from '../ui/anchor/Anchor'

type TProps = {
  children: React.ReactNode
  id?: string
  path: string
  className: string
}

const NavLink = ({
  children,
  id,
  path,
  className,

  ...rest
}: TProps) => {
  return (
    <Anchor
      path={path}
      id={id}
      className={clsx(
        'flex flex-col items-center font-medium leading-snug text-white 2xl:text-[16px]',
        className,
      )}
      role="menuitem"
      tabIndex={0}
      {...rest}
    >
      {children}
    </Anchor>
  )
}

export default NavLink
