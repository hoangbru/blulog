import { Fragment } from "react";
import "./login.css";

import { Breadcrumb } from "@/components/template";
import LoginContainer from "./_components/LoginContainer";

export default function Login() {
  return (
    <Fragment>
      <Breadcrumb />
      <LoginContainer />
    </Fragment>
  );
}
