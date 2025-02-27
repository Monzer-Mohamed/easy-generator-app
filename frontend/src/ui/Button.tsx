import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}
const Button: React.FC<ButtonProps> = ({ text, className, ...props }) => {
  return (
    <button {...props} className={className}>
      {text}
    </button>
  );
};

export default Button;
