import React, { forwardRef } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
  helperTextClassName?: string;
  inputClassName?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, className, labelClassName, inputClassName, ...props }, ref) => {
    return (
      <div className={className}>
        {label && <label className={labelClassName}>{label}</label>}
        <input className={inputClassName} ref={ref} {...props} />
      </div>
    );
  }
);

export default InputField;
