import { useAppSelector } from '@redux/store'
import React from 'react'

interface IMain {
  children: React.ReactNode
  title?: string
}

const Main = ({ children, title }: IMain) => {
  const { navOpen } = useAppSelector((state) => state.dashboard)
  return (
    <main
      className={`${
        navOpen
          ? 'ml-[180px] transition-all duration-500'
          : 'ml-12 transition-all duration-500 sm:ml-14 md:ml-16 lg:ml-60'
      } mt-16 min-h-[calc(95vh-4rem)] p-5`}
    >
      <div className="mb-5">
        <h3 className="text-lg text-gray-500">{title}</h3>
      </div>
      {children}
    </main>
  )
}

export default Main
