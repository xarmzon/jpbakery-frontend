import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import MessageBox from "../MessageBox";

export interface Options {}

export interface SelectOptionProps {
  text: string;
  value: string;
}

export interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  default_?: SelectOptionProps;
  options: SelectOptionProps[];
  labelClass?: string;
  labelValue?: string;
  showLabel?: boolean;
  error?: string;
}

const Select = (props: SelectProps) => {
    const {error, options, showLabel, labelClass, labelValue, id, default_, ...rest} = props
  return (
    <div className="flex flex-col space-y-2">
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
      <select
      id={id}
        className="bg-gray-200/80 border-none text-primary"
        {...rest}
      >
        <option value={default_ ? default_.value : ""}>
          {default_ ? default_.text : "Available options"}
        </option>
        {options.length > 0 &&
          options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.text}
            </option>
          ))}
      </select>
      <MessageBox
        msg={error || ""}
        show={Boolean(error && error.length > 0)}
      />
    </div>
  );
};

export default Select;
