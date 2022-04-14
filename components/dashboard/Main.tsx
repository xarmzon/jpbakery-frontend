import { useAppSelector } from '@redux/store'
import React from 'react'

interface IMain{
    children:React.ReactNode
}

const Main = ({children}:IMain) => {
    const {navOpen} = useAppSelector(state=>state.dashboard)
  return (
    <main className={`${navOpen? "ml-[180px] transition-all duration-500": "ml-12 sm:ml-14 md:ml-16 lg:ml-60 transition-all duration-500"} mt-16 p-5 min-h-[calc(95vh-4rem)]`}>
        {children}
        </main>
  )
}

export default Main