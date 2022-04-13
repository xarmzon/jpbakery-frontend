import { NavLink } from '@utils/types'
import React from 'react'
import ListItem from './ListItem'

interface INavItems {
  className?: string
  items: NavLink[]
}

const NavItems = ({ className = '', items }: INavItems) => {
  return (
    <ul className={` ${className}`}>
      {items.map((item, i) => (
        <ListItem key={i} text={item.text} icon={item?.icon} link={item.link} />
      ))}
    </ul>
  )
}

export default NavItems
