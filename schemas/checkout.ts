import { z } from "zod";

export const billingDetailSchema = z.object({
  fullName: z
    .string({
      required_error: "Full name is required",
      invalid_type_error: "Full name must be a string",
    })
    .nonempty({ message: "Full name cannot be empty" })
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(50, { message: "Full name must be at least 50 characters" }),
  phone: z
    .string({
      required_error: "Phone is required",
    })
    .nonempty({ message: "Phone cannot be empty" }),
  country: z
    .string({
      required_error: "Country is required",
      invalid_type_error: "Country must be a string",
    })
    .nonempty({ message: "Country cannot be empty" }),
  city: z
    .string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    })
    .nonempty({ message: "City cannot be empty" }),
  region: z
    .string({
      required_error: "Region is required",
      invalid_type_error: "Region must be a string",
    })
    .nonempty({ message: "Region cannot be empty" }),
  addressLine: z
    .string({
      required_error: "Address line is required",
      invalid_type_error: "Address line must be a string",
    })
    .nonempty({ message: "Address line cannot be empty" }),
});
