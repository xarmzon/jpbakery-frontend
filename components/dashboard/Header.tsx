import Button from '@components/Button'
import { toggleModal, toggleNav } from '@redux/slice/dashboard'
import { useAppDispatch, useAppSelector } from '@redux/store'
import Image from 'next/image'
import React from 'react'
import { BiBell, BiMenu } from 'react-icons/bi'

const Header = () => {
  const {loggedIn, loading, user} = useAppSelector(state=>state.auth)
  const {navOpen} = useAppSelector(state=>state.dashboard)
  const dispatch = useAppDispatch()
  return (
    <header className={`${navOpen ? "ml-[180px] transition-all duration-500": "ml-12 sm:ml-14 md:ml-16 lg:ml-60 transition-all duration-500"} fixed top-0 left-0 right-0 bg-green-300 h-16 p-5 z-[88] border-b bg-white-x200/10 backdrop-blur-sm border-b-secondary-t3/10 transition-all duration-500 flex justify-between space-x-3`}>
      <div className="sm:flex sm:space-x-3 items-center">
      <div className="hidden sm:flex sm:flex-col lg:hidden cursor-pointer relative" onClick={()=> dispatch(toggleNav())}>
        <BiMenu className='text-secondary text-xl'/>
      </div>
      <div className="flex space-x-5 items-center">
        <BiBell className='text-xl text-gray-500'/>
      <Button onClick={()=> dispatch(toggleModal())} text='Request' className='px-3 py-1' />    
      </div>
      </div>
      <div className="flex-1 flex justify-end items-center">
        {
          !loading && loggedIn && user && (
            <div className="relative h-10 w-10 cursor-pointer rounded-full overflow-hidden bg-gray-300 text-secondary-t4 text-center leading-10 uppercase">
              {
                user.picture? <Image src={user.picture?? "/images/profile_avatar.png"} layout='fill' alt="profile photo" objectFit='cover' /> : user.fullName.split("")[0]
              }
            </div>
          )
        }
      </div>
    </header>
  )
}

export default Header