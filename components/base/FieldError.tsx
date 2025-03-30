import { FC, Fragment } from "react";

interface FieldErrorProps {
  message?: string[];
}
const FieldError: FC<FieldErrorProps> = ({ message }) => {
  return (
    <Fragment>
      {message ? (
        <span
          style={{ color: "red", fontSize: "14px" }}
          aria-live="polite"
          role="status"
        >
          {message.join(". ")}
        </span>
      ) : (
        <span></span>
      )}
    </Fragment>
  );
};

export default FieldError;
