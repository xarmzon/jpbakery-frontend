import { APP_NAME } from '@utils/constants'
import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-t-primary-d1/60 bg-primary-t1/50 p-5 py-8">
      <div className="container">
        <div className=" mx-auto max-w-lg text-center text-sm lg:text-base">
          This is a project designed for {APP_NAME} &copy;
          {new Date().getFullYear()} JP. All rights reserved. Designed by{' '}
          <a
            href="https://www.linkedin.com/in/rastarm/"
            target="_blank"
            rel="noreferrer"
          >
            RastaXarm
          </a>
          <div className="mt-5 flex items-center justify-center space-x-3 text-xl text-primary-t3 lg:text-2xl">
            <FaFacebook className="cursor-pointer transition-all duration-700 hover:-translate-y-3" />
            <FaInstagram className="cursor-pointer transition-all duration-700 hover:-translate-y-3" />
            <FaTwitter className="cursor-pointer transition-all duration-700 hover:-translate-y-3" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
