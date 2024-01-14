import clsx from 'clsx'
import Anchor from '../ui/anchor/Anchor'
import CSText from '../ui/text/CSText'

interface MenuItem {
  path?: string
  title: string
}

interface TProps {
  menu: MenuItem[]
  className?: string
  onFocus?: () => void
  [key: string]: any
}

const Submenu = ({ menu, className, onFocus, ...rest }: TProps) => {
  return (
    <ul
      className={clsx(
        'absolute left-[3rem] top-full z-20 hidden w-[11.4rem] rounded-b-[1rem] bg-black bg-opacity-80 px-[2.3rem] py-[1.5rem] transition-all group-hover:visible group-hover:block',
        className,
      )}
      {...rest}
    >
      {menu.map((value, index) => (
        <li key={index} className="relative">
          <Anchor
            className="text-secondary flex items-center py-[0.5rem] "
            path={value.path}
            title={value.title}
          >
            <CSText
              size="12"
              color="white"
              className="whitespace-pre-line hover:text-white/50"
            >
              {value.title}
            </CSText>
          </Anchor>
        </li>
      ))}
    </ul>
  )
}

export default Submenu
