import Link from 'next/link'
import React from 'react'

interface IButton {
  type?: 'fill' | 'outline' | 'text'
  text: string
  className?: string
  linkClassName?:string
  isLink?: boolean
  href?: string
}

const Button = ({
  type = 'fill',
  text,
  className="",
  isLink = false,
  href = '/',
  linkClassName=""
}: IButton) => {
  return (
   !isLink ? ( <button
    className={`cursor-pointer px-8 py-3 text-lg ${
      type === 'fill'
        ? 'rounded-md bg-primary text-white-x100 hover:bg-white-x100 hover:text-primary hover:shadow-s1'
        : ''
    } transition-all duration-700 ${className}`}
  >
    {text}
  </button>) : (
    <Link href={href}>
      <a className={`${linkClassName} ${className}`}>{text}</a>
    </Link>
  ) 
  )
}

export default Button
