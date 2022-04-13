import useSticky from '@hooks/useSticky'
import { APP_NAME, NAV_ITEMS_1, ROUTES } from '@utils/constants'
import { NavLink } from '@utils/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import ListItem from './ListItem'

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
        <div className="">
          <Link href="/">
            <a className="relative flex h-16 w-16 space-x-1 font-libre text-3xl font-bold xl:h-20 xl:w-20">
              <Image
                src={'/images/logo.png'}
                layout="fill"
                objectFit="contain"
                alt={`${APP_NAME} LOGO`}
              />
            </a>
          </Link>
        </div>
        <ul className="hidden md:flex md:space-x-8">
          {NAV_ITEMS_1.map((item, i) => (
            <ListItem
              key={i}
              text={item.text}
              icon={item?.icon}
              link={item.link}
            />
          ))}
        </ul>
        <ul className="flex items-center justify-between">
          {NAV_ITEMS_2.map((item, i) => (
            <ListItem
              key={i}
              text={item.text}
              icon={item?.icon}
              link={item.link}
            />
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default GeneralNavbar
