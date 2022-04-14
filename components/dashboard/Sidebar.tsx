import Logo from '@components/Logo'
import { useAppSelector } from '@redux/store'
import { ROUTES } from '@utils/constants'
import { NavLink } from '@utils/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {
  BiCartAlt,
  BiCategoryAlt,
  BiGridAlt,
  BiLogOutCircle,
  BiQr,
  BiReceipt,
  BiUserCircle,
} from 'react-icons/bi'

const DASHBOARD_LINKS: NavLink[] = [
  {
    icon: <BiCategoryAlt />,
    link: ROUTES.DASHBOARD.OVERVIEW,
    text: 'Dashboard',
  },
  {
    icon: <BiCartAlt />,
    link: ROUTES.DASHBOARD.ORDERS,
    text: 'Orders',
  },
  {
    icon: <BiReceipt />,
    link: ROUTES.DASHBOARD.RECEIPTS,
    text: 'Receipts',
  },
  {
    icon: <BiUserCircle />,
    link: ROUTES.DASHBOARD.PROFILE,
    text: 'Profile',
  },
]
const Sidebar = () => {
  const router = useRouter()
  const { loggedIn, loading, user } = useAppSelector((state) => state.auth)
  const { navOpen } = useAppSelector((state) => state.dashboard)
  return (
    <aside
      className={`${
        navOpen
          ? 'z-[89] w-[180px] bg-white-x200/30 shadow-lg backdrop-blur-sm transition-all duration-500'
          : 'w-12 transition-all duration-500 sm:w-14 md:w-16 lg:w-60'
      } fixed top-0 left-0 bottom-0 flex h-full flex-col items-center border-r border-r-secondary-t4/10 pt-2 transition-all duration-500`}
    >
      <div className="flex h-12 w-full items-center justify-center lg:h-32">
        <Logo className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-24 lg:w-24" />
      </div>
      <div className="mt-4 flex h-full w-full flex-1 flex-col overflow-hidden">
        <ul className="flex flex-1 flex-col space-y-5 overflow-y-auto scrollbar-thin">
          {DASHBOARD_LINKS.map((item, i) => (
            <li
              title={item.text}
              className={`${
                router.asPath === item.link ? 'text-secondary' : 'text-gray-600'
              } group w-full p-5`}
              key={i}
            >
              <Link href={item.link}>
                <a
                  className={`flex h-full w-full ${
                    navOpen
                      ? 'justify-start text-lg'
                      : 'justify-center text-3xl transition-all duration-500'
                  } items-center space-x-3 lg:justify-start lg:text-xl`}
                >
                  {item.icon && <span className="">{item.icon}</span>}
                  <span
                    className={`${
                      navOpen ? 'block' : 'hidden'
                    } transition-all duration-500 lg:block`}
                  >
                    {item.text}
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative flex h-10 w-full shrink-0 items-center justify-center p-5 lg:h-16">
          <Link href={ROUTES.ACCOUNT.LOGOUT}>
            <a
              className={`absolute inset-0 flex h-full w-full items-center text-center text-xl ${
                navOpen ? 'justify-start' : 'justify-center'
              } space-x-2 p-5 transition-all duration-500 lg:justify-start`}
            >
              <BiLogOutCircle className="shrink-0 text-xl text-red-light/80" />
              <span
                className={`text-base lg:text-xl ${
                  navOpen ? 'block' : 'hidden transition-all duration-500'
                } transition-all duration-500 lg:block`}
              >
                Logout
              </span>
            </a>
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
