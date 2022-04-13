import Logo from '@components/Logo'
import useSticky from '@hooks/useSticky'
import { APP_NAME, NAV_ITEMS_1, ROUTES } from '@utils/constants'
import { NavLink } from '@utils/types'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import NavItems from './NavItems'

const NAV_ITEMS_2: NavLink[] = [
  {
    icon: <BiUser />,
    link: ROUTES.ACCOUNT.LOGIN,
    text: 'My Account',
  },
]
const GeneralNavbar = () => {
  const { sticky } = useSticky()
  return (
    <nav
      className={`fixed top-0 left-0 z-[999] h-20 w-full xl:h-24 ${
        sticky
          ? 'border-b-[1px] border-b-secondary-t1/50 bg-primary-t1/50 backdrop-blur-[3px]'
          : ''
      } flex items-center justify-center transition-all duration-700`}
    >
      <div className="container flex w-full items-center justify-between px-5">
        <Logo/>
        <NavItems items={NAV_ITEMS_1} className='hidden md:flex md:space-x-8'/>
        <NavItems items={NAV_ITEMS_2} className="flex items-center justify-between" />
      </div>
    </nav>
  )
}

export default GeneralNavbar
