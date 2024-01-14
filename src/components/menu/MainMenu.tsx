import clsx from 'clsx'
import NavLink from './NaveLink'
import Submenu from './SubMenu'
import CSText from '../ui/text/CSText'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const menu = [
  {
    id: 1,
    label: 'ABOUT',
    path: '/',
  },
  {
    id: 2,
    label: '메타월드',
    path: '/healing/homepage',
  },

  {
    id: 4,
    label: '체험·XR 직업',
    path: '/experience',
    submenu: [
      { title: '랩키드 3', path: '/experience/labkid-03' },
      { title: '랩키드 4', path: '/experience/labkid-04' },
      { title: '랩키드 5', path: '/experience/labkid-05' },
      { title: '랩키드 6', path: '/experience' },
      { title: '랩키드 7', path: '/experience' },
    ],
  },
  {
    id: 5,
    label: '배움·LEARN ',
    sub_label: '(AI·메타버스 캠퍼스)',
    path: '/digital-literacy',
    submenu: [
      { title: '디지털 \n리터러시', path: '/digital-literacy' },
      { title: '진로상담심리', path: '/career-counseling' },
      { title: '크리에이터', path: '/courses' },
    ],
  },

  {
    id: 6,
    label: '구독 플랜',
    path: '/subscribe',
  },
]

const MainMenu = () => {
  const { data: user } = useSession()
  const router = useRouter()

  return (
    <nav>
      <ul>
        {menu.map(({ id, label, path, submenu }, index) => {
          return (
            <li
              key={id}
              className={clsx(
                'group relative inline-flex items-center px-[3rem]',
              )}
              role="none"
              onClick={() => {
                if (!user) {
                  alert('로그인을 하셔야 이용 가능합니다'),
                    router.push('/auth/login')
                }
                if (id === 1) {
                  window.open('https://www.pathfindermeta.com/')
                }
              }}
            >
              <NavLink
                id={`nav-${id}`}
                path={path}
                className="relative hover:opacity-50"
              >
                <CSText size="14" color="white" weight="medium">
                  {label}
                </CSText>
              </NavLink>

              {submenu && <Submenu menu={submenu} />}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MainMenu
