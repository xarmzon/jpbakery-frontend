import Logo from '@components/Logo'
import useSticky from '@hooks/useSticky'
import { useAppSelector } from '@redux/store'
import { APP_NAME, NAV_ITEMS_1, ROUTES } from '@utils/constants'
import { NavLink } from '@utils/types'
import React, { useEffect, useState } from 'react'
import {
  BiLogInCircle,
  BiLogOutCircle,
  BiUser,
  BiUserPlus,
} from 'react-icons/bi'
import NavItems from './NavItems'

const NAV_ITEMS_2: NavLink[] = [
  {
    icon: <BiUser />,
    link: ROUTES.DASHBOARD.OVERVIEW,
    text: 'Dashboard',
  },
  {
    icon: <BiLogOutCircle />,
    link: ROUTES.ACCOUNT.LOGOUT,
    text: 'Logout',
  },
]

const NAV_ITEMS_3: NavLink[] = [
  {
    icon: <BiLogInCircle />,
    link: ROUTES.ACCOUNT.LOGIN,
    text: 'Login',
  },
  {
    icon: <BiUserPlus />,
    link: ROUTES.ACCOUNT.SIGNUP,
    text: 'Signup',
  },
]
const GeneralNavbar = () => {
  const { loading, loggedIn } = useAppSelector((state) => state.auth)
  const { sticky } = useSticky()
  const [navItems, setNavItems] = useState(() =>
    loggedIn ? NAV_ITEMS_2 : NAV_ITEMS_3
  )

  useEffect(() => {
    if (loggedIn) {
      setNavItems(NAV_ITEMS_2)
    } else {
      setNavItems(NAV_ITEMS_3)
    }
  }, [loggedIn])

  return (
    <nav
      className={`fixed top-0 left-0 z-[999] h-20 w-full xl:h-24 ${
        sticky
          ? 'border-b-[1px] border-b-secondary-t1/50 bg-primary-t1/50 backdrop-blur-[3px]'
          : ''
      } flex items-center justify-center transition-all duration-700`}
    >
      <div className="container flex w-full items-center justify-between px-5">
        <Logo />
        <NavItems items={NAV_ITEMS_1} className="hidden md:flex md:space-x-8" />
        {!loading && (
          <NavItems
            items={navItems}
            className="flex items-center justify-between space-x-3"
          />
        )}
      </div>
    </nav>
  )
}

export default GeneralNavbar
