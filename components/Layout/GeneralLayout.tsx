import Footer from '@components/Footer'
import GeneralNavbar from '@components/Navbar/GeneralNavbar'
import { NextSeo } from 'next-seo'
import React from 'react'

interface IGeneralLayout {
  children: React.ReactNode
  title?: string
}

const GeneralLayout = ({ children, title }: IGeneralLayout) => {
  return (
    <div className="w-full overflow-x-hidden">
      {title && <NextSeo title={title} />}
      <GeneralNavbar />
      <main className="w-full overflow-hidden">{children}</main>
      <Footer />
    </div>
  )
}

export default GeneralLayout
