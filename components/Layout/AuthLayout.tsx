import Button from '@components/Button'
import Loader from '@components/Loader'
import Logo from '@components/Logo'
import { useAppSelector } from '@redux/store'
import { NextSeo } from 'next-seo'
import React from 'react'
import { BiKey} from "react-icons/bi"
interface IAuthLayout {
  children: React.ReactNode
  title?: string
}

const AuthLayout = ({ children, title }: IAuthLayout) => {
  const {loggedIn, loading, user} = useAppSelector(state=>state.auth)

  return (
    <section className="bg-image2 grid relative place-items-center bg-cover bg-bottom min-h-screen w-full overflow-hidden">
      <div className='pointer-events-none z-[1] absolute inset-0 h-full w-full bg-gradient-to-t from-primary-t1/60 to bg-secondary-t3/70 backdrop-blur-[3px]'/>
      {title && <NextSeo title={title} />}
      <div className="z-[5] relative container p-5">
        <div className="max-w-2xl mx-auto">
          <div className="relative flex items-center justify-center md:hidden"><Logo/></div>
          <div className="mt-8 rounded-xl grid grid-cols-12 min-h-[350px] backdrop-blur-sm bg-white-x100/40 overflow-hidden shadow-xl">
          <div className="w-full h-full col-span-12 md:col-span-7 ">
          {loading?(
             <div className='flex h-full w-full items-center justify-center'>
               <Loader/>
             </div>
          ) : loggedIn ? (
            <div className="items-center flex-col text-center space-y-5 justify-center flex h-full w-full">
              <p className='text-xl'>Hi <span className="font-bold">{user?.fullName}</span></p>
              <div className="flex flex-col underline space-y-3 text-primary">
              <Button className='text-base' isLink href='/' text='Goto Dashboard'/>
              <Button className='text-base' isLink href='/' text='Logout Here'/>
              </div>
            </div>
          ): children}
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:col-span-5 bg-secondary-t1 w-full h-full rounded-l-xl">
            <Logo className='h-44 w-44'/>

          </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default AuthLayout
