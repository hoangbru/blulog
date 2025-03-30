import { Fragment } from "react";
import "./register.css";

import { Breadcrumb } from "@/components/template";
import RegisterContainer from "./_components/RegisterContainer";

export default function Register() {
  return (
    <Fragment>
      <Breadcrumb />
      <RegisterContainer />
    </Fragment>
  );
}
