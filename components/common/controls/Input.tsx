import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import MessageBox from '../MessageBox'

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  showLabel?: boolean
  error?: string
  labelValue?: string
  labelClass?: string
  isBtn?: boolean
  inputClass?: string
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
}

const Input = (props: InputProps) => {
  const {
    error,
    inputClass,
    isBtn,
    disabled,
    leftIcon,
    rightIcon,
    labelClass,
    id,
    labelValue,
    showLabel,
    ...rest
  } = props
  return (
    <div className="flex flex-col space-y-1">
      {showLabel && (
        <label
          htmlFor={id}
          className={`md:text-md text-sm ${labelClass} ${
            error && error.length > 0 ? 'text-red-light' : 'text-slate-600'
          }`}
        >
          {labelValue}
        </label>
      )}
      <div className="relative flex w-full items-center">
        {leftIcon && (
          <div
            className={`absolute left-2 text-lg ${
              error && error.length > 0 ? 'text-red-light' : 'text-primary'
            }`}
          >
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          className={`w-full ${
            error && error.length > 0
              ? 'border-red-light text-red-light focus:ring-red-light'
              : 'border-transparent text-primary focus:ring-primary'
          } ${
            isBtn
              ? 'mx-auto my-2 inline-block w-[65%] cursor-pointer rounded-xl border-none bg-primary px-3 py-2 text-center !text-white-x200 outline-none ring-0 transition-[background] duration-500 hover:bg-white-x200 hover:font-bold hover:!text-primary hover:shadow-xl'
              : 'rounded-md border bg-gray-200/80 px-3 py-2 text-opacity-80 shadow ring-1 ring-transparent focus:border-transparent focus:shadow-lg focus:outline-none'
          }  ${inputClass && inputClass} ${leftIcon ? 'pl-8' : ''} ${
            disabled ? 'pointer-events-none' : ''
          }`}
          disabled={disabled}
          {...rest}
        />
      </div>
      <MessageBox
        msg={error || ''}
        type="error"
        show={Boolean(error && error.length > 0)}
      />
    </div>
  )
}

export default Input
