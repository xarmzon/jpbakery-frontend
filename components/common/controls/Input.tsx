import {DetailedHTMLProps, InputHTMLAttributes } from "react";
import MessageBox from "../MessageBox";

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  showLabel?: boolean;
  error?: string;
  labelValue?: string;
  labelClass?: string;
  isBtn?: boolean;
  inputClass?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const Input = (props: InputProps) => {
    const {error, inputClass, isBtn, disabled, leftIcon, rightIcon, labelClass, id, labelValue, showLabel , ...rest} = props
  return (
    <div className="space-y-1 flex flex-col">
      {showLabel && (
        <label
          htmlFor={id}
          className={`text-sm md:text-md ${labelClass} ${
            error && error.length > 0 ? "text-red-light": "text-slate-600"
          }`}
        >
          {labelValue}
        </label>
      )}
      <div className="w-full flex relative items-center">
          {
              leftIcon && <div className={`absolute left-2 text-lg ${error && error.length>0 ? "text-red-light": "text-primary"}`}>
                  {leftIcon}
              </div>
          }
      <input
      id={id}
        className={`w-full ${
          error && error.length > 0
            ? "border-red-light focus:ring-red-light text-red-light"
            : "border-transparent focus:ring-primary text-primary"
        } ${
          isBtn
            ? "cursor-pointer inline-block px-3 py-2 !text-white-x200 rounded-xl bg-primary w-[65%] mx-auto text-center my-2 ring-0 outline-none border-none hover:!text-primary hover:bg-white-x200 transition-[background] duration-500 hover:font-bold hover:shadow-xl"
            : "px-3 py-2 bg-gray-200/80 text-opacity-80 rounded-md shadow ring-1 border ring-transparent focus:outline-none focus:shadow-lg focus:border-transparent"
        }  ${
          inputClass && inputClass
        } ${leftIcon? "pl-8": ""} ${disabled? "pointer-events-none": ""}`}
        disabled={disabled}
        {...rest}
    
      />
      </div>
      <MessageBox
        msg={error || ""}
        type="error"
        show={Boolean(error && error.length > 0)}
      />
    </div>
  );
};

export default Input;
