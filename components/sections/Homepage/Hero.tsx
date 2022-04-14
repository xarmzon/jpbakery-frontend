import Button from '@components/Button'
import { useAppSelector } from '@redux/store'
import { MESSAGES, ROUTES } from '@utils/constants'
import { useRouter } from 'next/router'
import React from 'react'
import toast from 'react-hot-toast'

const Hero = () => {
  const router = useRouter()
  const {loading, loggedIn} = useAppSelector(state=>state.auth)
  const orderCake = ()=>{
    if(!loading && !loggedIn){
      toast.error(MESSAGES.LOGIN_REQUIRED)
      router.push(ROUTES.ACCOUNT.LOGIN)
    }else{
      toast.error("Please Order through your dashboard")
      router.push(ROUTES.DASHBOARD.OVERVIEW)
    }
  }
  return (
    <header className="relative min-h-[80vh] lg:min-h-[90vh] w-full bg-image1 bg-cover bg-left md:bg-bottom">
      <span className="z-1 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/40 to-secondary/30"></span>
      <div className="container relative z-[2] flex h-[75vh] lg:h-[80vh] items-center justify-center px-5 pt-20 md:justify-end xl:pt-24">
        <div className="content mt-8 flex w-full max-w-md flex-col items-center space-y-5 rounded-md bg-white-x100/80 p-5 shadow-s1 backdrop-blur-[2px] lg:max-w-xl lg:space-y-8 lg:p-10 xl:space-y-10 xl:p-11">
          <h1 className="font-playfair text-3xl font-bold text-primary-t3 sm:text-5xl xl:text-6xl">
            A Cake Designed <span className="text-secondary">Just for you</span>
          </h1>
          <p className="text-sm font-light sm:text-base lg:text-lg xl:text-xl">
            We design and deliver delicious and unique cakes for any special
            occasions.
          </p>
          <Button onClick={()=> orderCake()} text="Book Us Now" />
        </div>
      </div>
    </header>
  )
}

export default Hero
