import { APP_NAME } from '@utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


interface ILogo{
    className?:string
}


const Logo = ({className=""}:ILogo) => {
  return (

          <Link href="/">
            <a className={`relative flex h-16 w-16 space-x-1 font-libre text-3xl font-bold xl:h-20 xl:w-20 ${className}`}>
              <Image
              priority={true}
                src={'/images/logo.png'}
                layout="fill"
                objectFit="contain"
                alt={`${APP_NAME} LOGO`}
              />
            </a>
          </Link>

  )
}

export default Logo