import React from 'react'

interface ILoader {
  text?: string
  showText?: boolean
}
const Loader = ({ text = 'Loading...', showText = true }: ILoader) => {
  return (
    <div className="h-30 w-30 flex flex-col items-center justify-center space-y-4">
      <span className="pointer-events-none block h-10 w-10 animate-spin rounded-xl bg-gradient-to-tr from-primary to-secondary"></span>
      {showText && (
        <p className=" animate-pulse text-sm capitalize text-primary">{text}</p>
      )}
    </div>
  )
}

export default Loader
