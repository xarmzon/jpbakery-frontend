import React from 'react'

interface ITitle {
  text: string
  className?: string
}

const Title = ({ text, className = '' }: ITitle) => {
  return (
    <h2
      className={`relative mx-auto max-w-max text-center font-playfair text-lg font-bold text-gray-900 sm:text-2xl lg:text-3xl xl:text-4xl ${className}`}
    >
      {text}
      <span className="absolute left-1/2 -bottom-2 h-[3px] w-[30%] -translate-x-1/2 rounded bg-secondary-t3 sm:-bottom-3 sm:h-1 sm:w-[45%]"></span>
    </h2>
  )
}

export default Title
