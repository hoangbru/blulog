import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`bb-btn-2 ${className}`}
        aria-disabled={disabled}
        {...props}
      >
        {disabled ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
