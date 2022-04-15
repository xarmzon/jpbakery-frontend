import Button from '@components/Button'
import Loader from '@components/Loader'
import Logo from '@components/Logo'
import { useAppSelector } from '@redux/store'
import { ROUTES } from '@utils/constants'
import { NextSeo } from 'next-seo'
import React, { useEffect } from 'react'
import { BiKey } from 'react-icons/bi'
interface IAuthLayout {
  children: React.ReactNode
  title?: string
}

const AuthLayout = ({ children, title }: IAuthLayout) => {
  const { loggedIn, loadingLogout, loading, user } = useAppSelector(
    (state) => state.auth
  )

  return (
    <>
      {title && <NextSeo title={title} />}
      <section className="relative grid min-h-screen w-full place-items-center overflow-hidden bg-image2 bg-cover bg-bottom">
        <div className="to pointer-events-none absolute inset-0 z-[1] h-full w-full bg-secondary-t3/70 bg-gradient-to-t from-primary-t1/60 backdrop-blur-[3px]" />
        <div className="container relative z-[5] p-5">
          <div className="mx-auto max-w-2xl">
            <div className="relative flex items-center justify-center md:hidden">
              <Logo />
            </div>
            <div className="mt-8 grid min-h-[350px] grid-cols-12 overflow-hidden rounded-xl bg-white-x100/40 shadow-xl backdrop-blur-sm">
              <div className="col-span-12 h-full w-full md:col-span-7 ">
                {loading ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <Loader />
                  </div>
                ) : loggedIn && !loadingLogout ? (
                  <div className="flex h-full w-full flex-col items-center justify-center space-y-5 text-center">
                    <p className="text-xl">
                      Hi <span className="font-bold">{user?.fullName}</span>
                    </p>
                    <div className="flex flex-col space-y-3 text-primary underline">
                      <Button
                        className="text-base"
                        isLink
                        href={ROUTES.DASHBOARD.OVERVIEW}
                        text="Goto Dashboard"
                      />
                      <Button
                        className="text-base"
                        isLink
                        href={ROUTES.ACCOUNT.LOGOUT}
                        text="Logout Here"
                      />
                    </div>
                  </div>
                ) : (
                  children
                )}
              </div>
              <div className="hidden h-full w-full rounded-l-xl bg-secondary-t1 md:col-span-5 md:flex md:items-center md:justify-center">
                <Logo className="h-44 w-44" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AuthLayout
