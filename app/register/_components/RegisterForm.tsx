"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { Button, Input, Label, FieldError } from "@/components/base";

import { mutation } from "@/utils/fetcher";
import { registerSchema } from "@/schemas/auth";
import { AuthState } from "@/types/auth";
import { validateForm } from "@/utils/validate";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<AuthState>({ email: [], password: [] });
  const formRef = useRef<HTMLFormElement>(null);

  const clearErrors = () => setErrors({ email: [], password: [] });

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const validated = validateForm(formData, registerSchema);
      if (!validated.success) {
        return setErrors({ ...validated.errors });
      }
      const apiResponse = await mutation(
        "/api/register",
        validated.data,
        "POST"
      );

      formRef.current?.reset();
      toast.success(apiResponse.meta.message);
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
    } catch (error: unknown) {
      const err = error as { message: string };
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} ref={formRef}>
      <div className="bb-register-wrap">
        <Label label={"Email*"}>
          <Input name="email" type="email" placeholder="Enter your Email" />
        </Label>
        <FieldError message={errors.email} />
      </div>
      <div className="bb-register-wrap">
        <Label label={"Password*"}>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </Label>
        <FieldError message={errors.password} />
      </div>
      <div className="bb-register-button">
        <Button disabled={isLoading}>Register</Button>
        <Link href="login">Login</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
