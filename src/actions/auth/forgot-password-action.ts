"use server";

import { getUserByEmail } from "@/data/user";
import { sendForgotPasswordEmail } from "@/lib/mail";
import { generateForgotPasswordToken } from "@/lib/tokens";
import { ForgotPasswordSchema } from "@/schemas/schema";
import * as z from "zod";

type Res =
  | { success: true }
  | {
      success: false;
      error: z.typeToFlattenedError<z.infer<typeof ForgotPasswordSchema>>;
      statusCode: 400;
    }
  | { success: false; error: string; statusCode: 401 | 500 };

export async function forgotPasswordAction(
  values: z.infer<typeof ForgotPasswordSchema>
): Promise<Res> {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    const flatErrors = validatedFields.error.flatten();
    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { email } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    // this is a false positive, to deter malicious users
    if (!existingUser?.id) return { success: true };

    if (!existingUser.password) {
      return {
        success: false,
        error: "This user was created with OAuth, please sign in with OAuth",
        statusCode: 401,
      };
    }

    const forgotPasswordToken = await generateForgotPasswordToken(
      existingUser.email
    );

    await sendForgotPasswordEmail(
      existingUser.email,
      forgotPasswordToken.token
    );

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
