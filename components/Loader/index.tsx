import React from 'react'

interface ILoader{
    text?:string
}
const Loader = ({text="Loading..."}:ILoader) => {
  return (
    <div className="h-30 w-30 flex flex-col items-center justify-center space-y-4">
      <span className="pointer-events-none block h-10 w-10 animate-spin rounded-xl bg-gradient-to-tr from-primary to-secondary"></span>
      <p className=" text-primary text-sm capitalize animate-pulse">{text}</p>
    </div>
  )
}

export default Loader
