import React from 'react'
import { IconType } from 'react-icons'

export type AuthSlice = {
  user: any
  token: string
  loggedIn: boolean
  loading: boolean
}

export type NavLink = {
  icon?: React.ReactNode
  text: string
  link: string
}
