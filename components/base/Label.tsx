import { FC, Fragment, ReactElement } from "react";

interface LabelProps {
  label: string;
  children: ReactElement<{ id: string }>;
}

const Label: FC<LabelProps> = ({ label, children }) => {
  const inputId = children.props.id;

  return (
    <Fragment>
      <label htmlFor={inputId}>{label}</label>
      {children}
    </Fragment>
  );
};

export default Label;
