"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { Button, Input, Label, FieldError } from "@/components/base";

import { loginSchema } from "@/schemas/auth";
import { AuthState, User } from "@/types/auth";
import { ResponseApi } from "@/types/response";
import { validateForm } from "@/utils/validate";
import { mutation } from "@/utils/fetcher";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<AuthState>({ email: [], password: [] });
  const formRef = useRef<HTMLFormElement>(null);

  const clearErrors = () => setErrors({ email: [], password: [] });

  const storeToken = (token: string) => {
    if (token) {
      localStorage.setItem("_bl_tk", token);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    try {
      const validated = validateForm(formData, loginSchema);
      if (!validated.success) {
        return setErrors({ ...validated.errors });
      }

      const apiResponse: ResponseApi<{ accessToken: string; user: User }> =
        await mutation("/api/login", validated.data, "POST");

      storeToken(apiResponse.data?.accessToken || "");
      formRef.current?.reset();
      toast.success(apiResponse.meta.message);
      location.href = "/";
    } catch (error: unknown) {
      const err = error as { message: string };
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} ref={formRef}>
      <div className="bb-login-wrap">
        <Label label={"Email*"}>
          <Input name="email" type="email" placeholder="Enter Your Email" />
        </Label>
        <FieldError message={errors.email} />
      </div>
      <div className="bb-login-wrap">
        <Label label={"Password*"}>
          <Input
            name="password"
            type="password"
            placeholder="Enter Your Password"
          />
        </Label>
        <FieldError message={errors.password} />
      </div>
      <div className="bb-login-wrap">
        <a href="javascript:void(0)">Forgot Password?</a>
      </div>
      <div className="bb-login-button">
        <Button disabled={isLoading}>Login</Button>
        <Link href="register">Register</Link>
      </div>
    </form>
  );
};

export default LoginForm;
