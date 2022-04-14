import Button from '@components/Button'
import { toggleModal, toggleNav } from '@redux/slice/dashboard'
import { useAppDispatch, useAppSelector } from '@redux/store'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { BiBell, BiMenu } from 'react-icons/bi'

const Header = () => {
  const { loggedIn, loading, user } = useAppSelector((state) => state.auth)
  const { navOpen } = useAppSelector((state) => state.dashboard)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const openRequestModal = () => {
    dispatch(
      toggleModal({
        open: true,
        type_: 'request',
      })
    )
  }

  return (
    <header
      className={`${
        navOpen
          ? 'ml-[180px] transition-all duration-500'
          : 'ml-12 transition-all duration-500 sm:ml-14 md:ml-16 lg:ml-60'
      } fixed top-0 left-0 right-0 z-[88] flex h-16 justify-between space-x-3 border-b border-b-secondary-t3/10 bg-green-300 bg-white-x200/10 p-5 backdrop-blur-sm transition-all duration-500`}
    >
      <div className="items-center sm:flex sm:space-x-3">
        <div
          className="relative hidden cursor-pointer sm:flex sm:flex-col lg:hidden"
          onClick={() => dispatch(toggleNav())}
        >
          <BiMenu className="text-xl text-secondary" />
        </div>
        <div className="flex items-center space-x-5">
          <BiBell className="text-xl text-gray-500" />

          {router.asPath.split('/').length < 3 && (
            <Button
              onClick={openRequestModal}
              text="Request"
              className="px-3 py-1"
            />
          )}
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end">
        {!loading && loggedIn && user && (
          <div className="relative h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-gray-300 text-center uppercase leading-10 text-secondary-t4">
            {user.picture ? (
              <Image
                src={user.picture ?? '/images/profile_avatar.png'}
                layout="fill"
                alt="profile photo"
                objectFit="cover"
              />
            ) : (
              user.fullName.split('')[0]
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
