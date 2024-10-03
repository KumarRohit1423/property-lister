import { z } from "zod";

export const NameSchema = z
  .string({ required_error: "Name is required" })
  .trim()
  .min(2, { message: "Name must be at least 2 characters long" })
  .max(100, {
    message: "Name must be at most 100 characters long",
  })
  .optional();

export const EmailSchema = z
  .string({ required_error: "Email is required" })
  .trim()
  .email({ message: "Invalid email address" })
  .min(1, { message: "Email is required" });

export const PasswordSchema = z
  .string({
    required_error: "Password cannot be empty.",
  })
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(50, {
    message: "Password must be at most 50 characters long",
  })
  .regex(/(?=.*[A-Z])/, {
    message: "At least one uppercase character.",
  })
  .regex(/(?=.*[a-z])/, {
    message: "At least one lowercase character.",
  })
  .regex(/(?=.*\d)/, {
    message: "At least one digit.",
  })
  .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
    message: "At least one special character.",
  });

export const UserSignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const UserSignUpSchema = UserSignInSchema.extend({
  name: NameSchema,
  confirmPassword: PasswordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match, please try again",
});

export const ResetPasswordSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const ForgotPasswordSchema = z.object({
  email: EmailSchema,
});
