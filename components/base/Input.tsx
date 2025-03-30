import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, ...props }, ref) => {
    return <input id={id} ref={ref} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;
