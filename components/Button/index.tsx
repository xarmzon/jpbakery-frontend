import React from 'react'

interface IButton {
  type?: 'fill' | 'outline' | 'text'
  text: string
  className?: string
  isLink?: boolean
  href?: string
}

const Button = ({
  type = 'fill',
  text,
  className,
  isLink = false,
  href = '/',
}: IButton) => {
  return (
    <button
      className={`cursor-pointer px-8 py-3 text-lg ${
        type === 'fill'
          ? 'rounded-md bg-primary text-white-x100 hover:bg-white-x100 hover:text-primary hover:shadow-s1'
          : ''
      } transition-all duration-700`}
    >
      {text}
    </button>
  )
}

export default Button
