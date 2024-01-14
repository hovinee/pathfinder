'use client'

import MainMenu from '@/components/menu/MainMenu'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSText from '@/components/ui/text/CSText'
import { useSticky } from '@/hooks'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Header = () => {
  const { sticky, measuredRef } = useSticky()
  const path = usePathname()
  const { data: user } = useSession()
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const header = clsx(
    'fixed z-10 h-[8.4rem] bg-181818 px-[3.5rem] flex w-full items-center justify-between',
    path === '/' && !sticky && 'absolute bg-transparent',
    sticky && 'fixed bg-181818 shadow-2xl shadow-181818',
  )

  const handleLogout = () => {
    signOut()
    setOpenMenu(false)
  }

  return (
    <>
      <header className={header} ref={measuredRef}>
        <div className="flex items-center gap-[5rem] ">
          <div
            className="w-[10rem] cursor-pointer"
            onClick={() => window.open('https://www.ducogen.net/')}
          >
            <AutoSizeImage
              src={'/images/logo.png'}
              className="h-[2.67rem] w-[12rem]"
            />
          </div>

          <Link href={'/'}>
            <div className="w-[20rem]">
              <AutoSizeImage src={'/images/mindcare_logo.png'} full />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-[5rem]">
          <MainMenu />
          {user ? (
            <div className="relative">
              <AutoSizeImage
                src={'/images/my_profile.png'}
                className="h-[4.2rem] w-[4.2rem] cursor-pointer"
                onClick={() => setOpenMenu(!openMenu)}
              />
              {openMenu && (
                <ul className="absolute right-full w-[15rem] bg-white pt-[1rem] shadow-lg">
                  <Link href="/my-info">
                    <li
                      className="cursor-pointer border-b py-[0.5rem] text-center text-16 hover:opacity-75"
                      onClick={() => setOpenMenu(false)}
                    >
                      마이페이지
                    </li>
                  </Link>
                  <Link href="/">
                    <li
                      className="cursor-pointer border-b py-[0.5rem] text-center text-16 hover:opacity-75"
                      onClick={handleLogout}
                    >
                      로그아웃
                    </li>
                  </Link>
                </ul>
              )}
            </div>
          ) : (
            <Link href={'/auth/login'} className="cursor-pointer">
              <CSText size="14" color="white" weight="semiBold">
                로그인
              </CSText>
            </Link>
          )}
        </div>
      </header>
    </>
  )
}
export default Header
