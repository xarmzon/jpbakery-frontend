import NProgress from 'nprogress'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import { SWRConfig } from 'swr'
import { swrFetcher } from '@utils/fetcher'
import store from '@redux/store'
import { addToken, addUser, setLoading, setLoginState } from '@redux/slice/auth'
import { DEFAULT_SEO } from '@utils/constants'

import 'nprogress/nprogress.css'
import '../styles/globals.css'

NProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const startProgress = () => NProgress.start()
    const stopProgress = () => NProgress.done()

    router.events.on('routeChangeStart', startProgress)
    router.events.on('routeChangeComplete', stopProgress)
    router.events.on('routeChangeError', stopProgress)

    return () => {
      router.events.off('routeChangeStart', startProgress)
      router.events.off('routeChangeComplete', stopProgress)
      router.events.off('routeChangeError', stopProgress)
    }
  }, [router])

  useEffect(() => {
    store.dispatch(setLoading(true))

    const userData = localStorage.getItem('user')

    const token = localStorage.getItem('token')
    if (token && userData && !store.getState().auth.loggedIn) {
      store.dispatch(addUser(userData))
      store.dispatch(setLoginState(true))
      store.dispatch(addToken(token))
    }
    if (!token && userData) {
      store.dispatch(addUser({}))
      store.dispatch(setLoginState(false))
      localStorage.removeItem('user')
    }

    store.dispatch(setLoading(false))
  }, [])

  return (
    <Provider store={store}>
      <DefaultSeo {...DEFAULT_SEO} />
      <SWRConfig
        value={{
          fetcher: async (resource, init) => await swrFetcher(resource, init),
        }}
      >
        <Component {...pageProps} key={router.route} />
      </SWRConfig>
      <Toaster />
    </Provider>
  )
}

export default MyApp
