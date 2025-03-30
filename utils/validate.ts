import { ZodSchema } from "zod";

export const validateForm = <T>(formData: FormData, schema: ZodSchema<T>) => {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return { success: false, errors: fieldErrors };
  }

  return { success: true, data: parsed.data };
};
