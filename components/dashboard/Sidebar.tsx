import Logo from '@components/Logo'
import { useAppSelector } from '@redux/store'
import { ROUTES } from '@utils/constants'
import { NavLink } from '@utils/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BiCartAlt, BiCategoryAlt, BiGridAlt, BiLogOutCircle, BiQr, BiReceipt, BiUserCircle } from 'react-icons/bi'

const DASHBOARD_LINKS:NavLink[] = [
  {
    icon: <BiCategoryAlt/>,
    link: ROUTES.DASHBOARD.OVERVIEW,
    text: "Dashboard"
  },
  {
    icon: <BiCartAlt/>,
    link: ROUTES.DASHBOARD.ORDERS,
    text: "Orders"
  },
  {
    icon: <BiReceipt/>,
    link: ROUTES.DASHBOARD.RECEIPTS,
    text: "Receipts"
  },
  {
    icon: <BiUserCircle/>,
    link: ROUTES.DASHBOARD.PROFILE,
    text: "Profile"
  },
]
const Sidebar = () => {
  const router = useRouter()
  const {loggedIn, loading, user} = useAppSelector(state=>state.auth)
  const {navOpen} = useAppSelector(state=>state.dashboard)
  return (
    <aside className={`${navOpen ? "w-[180px] z-[89] shadow-lg bg-white-x200/30 backdrop-blur-sm transition-all duration-500": "w-12 sm:w-14 md:w-16 lg:w-60 transition-all duration-500"} fixed top-0 left-0 bottom-0 h-full flex flex-col items-center pt-2 border-r border-r-secondary-t4/10 transition-all duration-500`}>
        <div className="h-12 lg:h-32 w-full flex justify-center items-center">
        <Logo className='w-10 h-10 sm:h-12 sm:w-12 md:w-14 md:h-14 lg:w-24 lg:h-24'/>
        </div>
      <div className="flex-1 flex flex-col w-full h-full overflow-hidden mt-4">
        <ul className="flex-1 flex flex-col space-y-5 overflow-y-auto scrollbar-thin">
        {
          DASHBOARD_LINKS.map((item,i)=>(
            <li title={item.text} className={`${router.asPath === item.link ? "text-secondary": "text-gray-600"} w-full p-5 group`} key={i}>
              <Link href={item.link}>
                <a className={`flex w-full h-full ${navOpen? "text-lg justify-start": "text-3xl justify-center transition-all duration-500"} lg:text-xl items-center space-x-3 lg:justify-start`}>
              {item.icon && (
                <span className="">
                {item.icon}
              </span>
              )}
              <span className={`${navOpen? "block" : "hidden"} lg:block transition-all duration-500`}>
                  {item.text}
              
              </span>
                  </a>
              </Link>
            </li>
          ))
        }
        </ul>
        <div className="shrink-0 h-10 lg:h-16 relative w-full flex items-center justify-center p-5">
            <Link href={ROUTES.ACCOUNT.LOGOUT}>
              <a className={`text-center absolute inset-0 h-full w-full text-xl flex items-center ${navOpen? "justify-start": "justify-center"} lg:justify-start p-5 space-x-2 transition-all duration-500`}>
              <BiLogOutCircle className='shrink-0 text-xl text-red-light/80'/>
                <span className={`text-base lg:text-xl ${navOpen? "block": "hidden transition-all duration-500"} lg:block transition-all duration-500`}>Logout</span>
              </a>
            </Link>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar