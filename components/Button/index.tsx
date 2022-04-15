import Link from 'next/link'
import React from 'react'

interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  type_?: 'fill' | 'outline' | 'text'
  text: string
  className?: string
  linkClassName?: string
  isLink?: boolean
  href?: string
}

const Button = (props: IButton) => {
  const {
    type_ = 'fill',
    text,
    className = '',
    isLink = false,
    href = '/',
    linkClassName = '',
    ...rest
  } = props
  return !isLink ? (
    <button
      className={`cursor-pointer px-8 py-3 text-lg ${
        type_ === 'fill'
          ? 'rounded-md bg-primary text-white-x100 hover:bg-white-x100 hover:text-primary hover:shadow-s1'
          : ''
      } transition-all duration-700 ${className}`}
      {...rest}
    >
      {text}
    </button>
  ) : (
    <Link href={href}>
      <a className={`${linkClassName} ${className}`}>{text}</a>
    </Link>
  )
}

export default Button
