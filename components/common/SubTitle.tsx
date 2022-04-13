import React from 'react'

interface ISubTitle {
  text: string
  className?: string
}
const SubTitle = ({ text, className = '' }: ISubTitle) => {
  return (
    <span
      className={`mx-auto mt-5 block w-[80%] max-w-lg px-5 text-center text-xs text-slate-700 sm:text-sm lg:mt-8 lg:max-w-xl lg:text-lg xl:max-w-3xl xl:text-2xl ${className}`}
    >
      {text}
    </span>
  )
}

export default SubTitle
