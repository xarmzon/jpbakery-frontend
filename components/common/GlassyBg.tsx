import React from 'react'

interface IGlassyBg {
  className?: string
}

const GlassyBg = ({ className }: IGlassyBg) => {
  return (
    <div
      className={`pointer-events-none absolute z-[1] h-[200px] w-[200px] rounded-full opacity-40 blur-2xl sm:h-[250px] sm:w-[250px] sm:blur-3xl md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px] xl:h-[400px] xl:w-[400px] ${className}`}
    ></div>
  )
}

export default GlassyBg
