import Header from '@components/dashboard/Header'
import Main from '@components/dashboard/Main'
import Sidebar from '@components/dashboard/Sidebar'
import Loader from '@components/Loader'
import DashboardModal from '@components/modal'
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

const DashboardLayout = ({
  children,
  title = 'Dashboard',
}: IDashboardLayout) => {
  const { loggedIn, loading, user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  useEffect(() => {
    if (!loading && !loggedIn) {
      toast.error(MESSAGES.LOGIN_REQUIRED)
      router.push(ROUTES.ACCOUNT.LOGIN)
      return
    }
  }, [dispatch, loading, loggedIn, router])
  return (
    <>
      {title && <NextSeo title={title} />}
      <section className="min-h-screen w-full overflow-hidden">
        {loading || (!loading && !loggedIn) ? (
          <div className="flex h-screen w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <Header />
            <Sidebar />
            <Main title={title}>{children}</Main>
          </>
        )}
        <DashboardModal />
      </section>
    </>
  )
}

export default DashboardLayout
