import AuthLayout from '@components/Layout/AuthLayout'
import Loader from '@components/Loader'
import { addUser, setLoadingLogout, setLoginState } from '@redux/slice/auth'
import { useAppDispatch, useAppSelector } from '@redux/store'
import { MESSAGES } from '@utils/constants'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const LogoutPage: NextPage = () => {
  const dispatch = useAppDispatch()
  const loggedIn = useAppSelector((state) => state.auth.loggedIn)
  const router = useRouter()
  useEffect(() => {
    dispatch(setLoadingLogout(true))
    if (loggedIn) {
      setTimeout(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        dispatch(addUser())
        dispatch(setLoginState(false))
        toast.success(MESSAGES.LOGOUT_SUCCESSFUL)
        router.push('/')
      }, 2000)
    } else {
      router.push('/')
    }
  }, [dispatch, loggedIn, router])
  return (
    <AuthLayout title="Logging Out....">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Loader text="Logging out..." />
      </div>
    </AuthLayout>
  )
}

export default LogoutPage
