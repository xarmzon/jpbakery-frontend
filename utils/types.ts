import React from 'react'
import { IconType } from 'react-icons'

export type AuthSlice = {
  user?: LoggedInUser
  token: string
  loggedIn: boolean
  loading: boolean
}
export type DashboardSlice = {
  navOpen: boolean
  modalOpen:boolean
}

export type NavLink = {
  icon?: React.ReactNode
  text: string
  link: string
}

export type User = {
  fullName: string
  username: string
  email: string
  picture: string
}

export type Order = {
  _id: string;
  user: User;
  sampleCakeImage: string;
  cakeColors: string;
  cakeSize: "sm" | "md" | "lg";
  deliveryDate: string;
  charges: number;
  deliveryAddress: string;
  nameOnCake: string;
  createdAt: string;
};

export type NewOrderForm = Omit<Order, "createdAt" | "user"|"_id">

export type LoggedInUser = User & {
  role: number,
  id: string,
  createdAt: string
}

export type RegForm = Omit<User, 'picture'> & {
  password: string
  cPassword?:string
}
export type LoginForm = Omit<RegForm, "cPassword"| "fullName">

export interface IError {
  name: string;
  msg: string;
}
export interface IRegError extends IError {}
