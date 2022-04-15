import { NavLink } from './types'
import { BiUser } from 'react-icons/bi'

export const APP_NAME = 'JP BAKERY'
export const DEFAULT_SEO = {
  title: 'Home of Good Cakes',
  defaultTitle: '',
  titleTemplate: `%s | ${APP_NAME}`,
  description: '',
}
export const USER_TYPES = {
  ADMIN: 1,
  CLIENT: 0,
}
export const PER_PAGE = 10
export const ALLOWED_EXTENSIONS_FOR_DP = ['jpeg', 'jpg', 'png']
export const ALLOWED_FILE_SIZE_DP = 1024 * 80 // 80kb
export const PASSWORD_MIN = 6
export const FULLNAME_MIN = 6
export const FULLNAME_MAX = 50

export const PAYMENT_STATUS = {
  PAID: 1,
  UNPAID: 0,
}

export const ROUTES = {
  ACCOUNT: {
    LOGIN: '/account/login',
    SIGNUP: '/account/signup',
    LOGOUT: '/account/logout',
  },
  DASHBOARD: {
    OVERVIEW: '/dashboard',
    ORDERS: '/dashboard/orders',
    RECEIPTS: '/dashboard/receipts',
    PROFILE: '/dashboard/profile',
  },
  API: {
    LOGIN: 'auth/login',
    SIGNUP: 'auth/signup',
    USER: 'user/',
    ORDER: 'order/',
    PAYMENT: 'payment/',
    OVERVIEW: 'user/overview/',
  },
}

export const USER_TYPES_TEXT = ['Client', 'Admin']

export const MESSAGES = {
  LOGOUT_SUCCESSFUL: 'Your account has been logged out successfully',
  UNKNOWN_ERROR: 'Unknown Error occurred. Please try again',
  FORM_ERROR: 'Please fill the form properly',
  LOGIN_REQUIRED: 'Please login first before you can access that page',
  ADMIN_REQUIRED: 'Sorry! only Admin can access that page',
  ALREADY_LOGIN: 'Please Logout first before you can have access to that page',
  FETCH_LOADING_ERROR:
    'Error Occurred while fetching the data. Please use the refresh button to reload the data',
  FETCH_LOADING_ERROR2: 'Error occurred while fetching the data. Reload now',
  FETCH_LOADING_SUCCESS: 'Data Fetched successfully',
  FETCH_LOADING_DATA: 'Loading Data.........',
  NO_DATA_TO_DISPLAY: 'SORRY! NO DATA AVAILABLE TO DISPLAY',
  NO_ACCESS_TO_ROUTE: "Oops! You don't have access to this page",
  GENERAL_ERROR_MESSAGE:
    'Oops! Something went wrong with your request. please try again',
  METHOD_NOT_ALLOWED: 'Sorry, Method not allowed or not yet supported',
  FORM: {
    FULL_NAME: `Invalid full name, please try again with minimum of ${FULLNAME_MIN} and maximum of ${FULLNAME_MAX} letters`,
    EMAIL: 'Invalid email supplied, please try again',
    PASSWORD: `Invalid password, please supplied a minimum of ${PASSWORD_MIN} characters with ${1} or more uppercase letters and ${1} or more numbers`,
    CPASSWORD: 'The supplied passwords do not match, please try again',
  },
}

export const HTTP_REQUEST_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
}

export const NAV_ITEMS_1: NavLink[] = [
  {
    text: 'About',
    link: '#about',
  },
  {
    text: 'Gallery',
    link: '#gallery',
  },
  {
    text: 'Featured',
    link: '#featured',
  },
]
