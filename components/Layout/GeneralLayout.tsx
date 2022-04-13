import Footer from '@components/Footer'
import GeneralNavbar from '@components/Navbar/GeneralNavbar'
import React from 'react'

interface IGeneralLayout {
  children: React.ReactNode
}

const GeneralLayout = ({ children }: IGeneralLayout) => {
  return (
    <div className="w-full overflow-x-hidden">
      <GeneralNavbar />
      <main className="w-full overflow-hidden">{children}</main>
      <Footer />
    </div>
  )
}

export default GeneralLayout
