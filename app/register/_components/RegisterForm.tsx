"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { Button, Input, Label, FieldError } from "@/components/base";

import { mutation } from "@/utils/fetcher";
import { registerSchema } from "@/schemas/auth";
import { AuthState } from "@/types/auth";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<AuthState>({
    message: { email: [], password: [] },
  });
  const formRef = useRef<HTMLFormElement>(null);

  const clearErrors = () => setErrors({ message: { email: [], password: [] } });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const validatedFields = registerSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      const { fieldErrors } = validatedFields.error.flatten();
      setErrors({
        message: {
          email: fieldErrors.email ?? [],
          password: fieldErrors.password ?? [],
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      const apiResponse = await mutation(
        "/api/register",
        validatedFields.data,
        "POST"
      );
      clearErrors();

      if (apiResponse.meta.errors) {
        toast.error(apiResponse.meta.message);
      } else {
        formRef.current?.reset();
        toast.success(apiResponse.meta.message);
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}//login`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <div className="bb-register-wrap">
        <Label label={"Email*"}>
          <Input name="email" type="email" placeholder="Enter your Email" />
        </Label>
        <FieldError message={errors.message.email} />
      </div>
      <div className="bb-register-wrap">
        <Label label={"Password*"}>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </Label>
        <FieldError message={errors.message.password} />
      </div>
      <div className="bb-register-button">
        <Button disabled={isLoading}>Register</Button>
        <Link href="login">Login</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
