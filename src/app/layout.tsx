import type { Metadata } from 'next'

import './globals.css'
import Footer from '@/layouts/footer/Footer'
import Header from '@/layouts/header/Header'
import { Noto_Sans_KR, Roboto } from 'next/font/google'
import { headers } from 'next/headers'
import clsx from 'clsx'
import { detectDevice } from '@/utils/method'
import DeviceProvider from '@/contexts/DeviceProvider'
import AuthProvider from '@/contexts/AuthProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://pathfinder-bice-eta.vercel.app/'),
  title: '랩키드 패스파인더GPT',
  description: '안녕하세요 "랩키드 패스파인더GPT"에 오신 것을 환영합니다.',
  icons: {
    icon: '/favicon.ico',
  },
}

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ['latin'], // 또는 preload: false
  weight: ['100', '400', '700', '900'], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'], // preload에 사용할 subsets입니다.
  weight: ['100', '400', '700'],
  variable: '--roboto', // CSS 변수 방식으로 스타일을 지정할 경우에 사용합니다.
  display: 'swap',
})

export const cls = (...classnames: string[]) => {
  return classnames.join(' ')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const requestHeaders = headers()
  const userAgent = requestHeaders.get('user-agent')
  const deviceInfo = detectDevice(userAgent!)

  return (
    <html lang="en">
      <body
        className={clsx(
          'flex flex-col bg-181818',
          cls(notoSansKr.className, roboto.variable),
        )}
      >
        <AuthProvider>
          <DeviceProvider deviceInfo={deviceInfo}>
            <Header />
            {children}
            <Footer />
          </DeviceProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
