import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaBaseProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaBaseProps>(
  ({ id, ...props }, ref) => {
    return <textarea id={id} ref={ref} {...props} />;
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
