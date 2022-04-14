import Header from '@components/dashboard/Header'
import Main from '@components/dashboard/Main'
import Sidebar from '@components/dashboard/Sidebar'
import Loader from '@components/Loader'
import RequestModal from '@components/modal'
import CustomModal from '@components/modal'
import { setLoading } from '@redux/slice/auth'
import { useAppDispatch, useAppSelector } from '@redux/store'
import { MESSAGES, ROUTES } from '@utils/constants'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'


interface IDashboardLayout {
    children: React.ReactNode
    title?: string
  }

const DashboardLayout = ({children, title}:IDashboardLayout) => {
    const {loggedIn, loading, user} = useAppSelector(state=>state.auth)
    const dispatch = useAppDispatch()
    const router = useRouter()
    useEffect(()=>{
        if(!loading && !loggedIn){
            toast.error(MESSAGES.LOGIN_REQUIRED)
            router.push(ROUTES.ACCOUNT.LOGIN)
            return;
        }
    },[dispatch, loading, loggedIn, router])
  return (
      <>
         {title && <NextSeo title={title} />}
         <section className='w-full min-h-screen overflow-hidden'>
             {
                 loading || (!loading && !loggedIn) ? (
                 <div className="w-full h-screen flex items-center justify-center">
                     <Loader/>
                 </div>
                 )
                 : (
                     <>        
             <Header/>
             <Sidebar/>
             <Main>
                 {children}
             </Main>
                     </>
                 )
             }
        <RequestModal/>
         </section>
      </>
  )
}

export default DashboardLayout