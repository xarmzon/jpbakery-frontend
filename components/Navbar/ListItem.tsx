import Link from 'next/link'
import React from 'react'

interface IListItem {
  link: string
  icon?: React.ReactNode
  text: string
  liClass?: string
  aClass?: string
}
const ListItem = ({
  icon,
  link,
  text,
  liClass = '',
  aClass = '',
}: IListItem) => {
  return (
    <li
      title={text}
      className={`group flex flex-col items-center justify-center text-primary-d1 ${liClass}`}
    >
      <Link href={link}>
        <a
          className={`relative  flex h-full w-full items-center justify-center space-x-1 text-center transition-all duration-700 group-hover:opacity-80 ${aClass}`}
        >
          {icon && (
            <span className="text-2xl md:text-base xl:text-2xl">{icon}</span>
          )}
          <span className="relative hidden sm:inline-block xl:text-xl">
            {text}

            <span
              className={`absolute left-1/2 -top-[2px] -z-[1] h-[3px] w-0 -translate-x-1/2 rounded-full bg-primary/50 opacity-0 transition-all duration-700 will-change-transform group-hover:w-5 group-hover:opacity-100`}
            ></span>
          </span>
        </a>
      </Link>
    </li>
  )
}

export default ListItem
