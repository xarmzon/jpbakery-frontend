import validator from 'validator'
import { MESSAGES } from './constants'
import { IRegError, RegForm } from './types'
import dateformat from 'dateformat'

export const validateEmail = (email: string) => {
  return validator.isEmail(email)
}

export const validateFullName = (fullName: string) => {
  return /^[a-zA-Z][a-zA-Z\s]{6,50}$/.test(fullName)
}

export const validateRegPassword = (password: string) => {
  const minLength = 6
  const minSymbols = 0
  return validator.isStrongPassword(password, { minLength, minSymbols })
}

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword
}

export const validateAccountForm = (formData: RegForm, cPass = false) => {
  const errors: IRegError[] = []

  const { fullName, email, password, cPassword } = formData

  if (!validateFullName(fullName))
    errors.push({ name: 'fullName', msg: MESSAGES.FORM.FULL_NAME })

  if (!validateEmail(email))
    errors.push({ name: 'email', msg: MESSAGES.FORM.EMAIL })

  if (!validateRegPassword(password))
    errors.push({ name: 'password', msg: MESSAGES.FORM.PASSWORD })

  if (cPass) {
    if (!validateConfirmPassword(password, cPassword as string))
      errors.push({
        name: 'cPassword',
        msg: MESSAGES.FORM.CPASSWORD,
      })
  }

  return errors
}

export const formatPrice = (price: string | number) => {
  let priceToConvert: number
  if (typeof price === 'string') {
    priceToConvert = parseFloat(price)
  } else {
    priceToConvert = price
  }

  return new Intl.NumberFormat('en-Us').format(priceToConvert)
}

export const getErrorMessage = (e: any) => {
  return e?.response?.msg
    ? e?.response?.msg
    : e?.response?.data?.msg
    ? e?.response?.data?.msg
    : e?.message
    ? e?.message
    : MESSAGES.GENERAL_ERROR_MESSAGE
}

export const processSize = (size: string) => {
  switch (size) {
    case 'sm':
      return 'Small'
    case 'md':
      return 'Medium'
    case 'lg':
      return 'Large'
  }
}

export const processTitle = (key: string) => {
  switch (key) {
    case 'cakeColors':
      return 'Cake Colors'
    case 'cakeSize':
      return 'Cake Size'
    case 'deliveryDate':
      return 'Delivery Date'
    case 'deliveryAddress':
      return 'Delivery Address'
    case 'charges':
      return 'Charges'
    case 'nameOnCake':
      return 'Name on Cake'
    case 'reference':
      return 'Order Reference'
    case 'createdAt':
      return 'Added On'
    case 'status':
      return 'Status'
  }
}

export const processText = (val: string | number, key: string) => {
  if (key === 'charges') return formatPrice(val)
  if (key === 'deliveryDate' || key === 'createdAt')
    return dateformat(val, 'longDate')
  if (key === 'cakeSize') {
    return processSize(val as string)
  }
  if (!val) return 'Unknown'

  return val
}

export const processStatusText = (
  status: number = 0,
  type: 'order' | 'payment' = 'order'
) => {
  switch (status) {
    case 0:
      return type === 'order' ? 'Unconfirmed' : 'Unpaid'
    case 1:
      return type === 'order' ? 'Confirmed' : 'Paid'
  }
}
