"use server";

import {
  deletePreviousForgotPasswordTokens,
  getForgotPasswordTokenByToken,
} from "@/data/token";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/prisma";
import { EmailSchema, ResetPasswordSchema } from "@/schemas/schema";
import * as argon2 from "argon2";
import * as z from "zod";

type Res =
  | { success: true }
  | {
      success: false;
      error: z.typeToFlattenedError<z.infer<typeof ResetPasswordSchema>>;
      statusCode: 400;
    }
  | { success: false; error: string; statusCode: 401 | 500 };

export async function resetPasswordAction(
  email: z.infer<typeof EmailSchema>,
  token: string,
  values: z.infer<typeof ResetPasswordSchema>
): Promise<Res> {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    const flatErrors = validatedFields.error.flatten();
    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { password } = validatedFields.data;

  const existingToken = await getForgotPasswordTokenByToken(token);

  if (!existingToken?.expires) {
    return {
      success: false,
      error: "Token is invalid",
      statusCode: 401,
    };
  }

  if (new Date(existingToken.expires) < new Date()) {
    return {
      success: false,
      error: "Token is expired",
      statusCode: 401,
    };
  }

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return {
      success: false,
      error: "Email does not exist",
      statusCode: 401,
    };
  }
  if (
    !existingUser?.password ||
    existingUser.email !== existingToken.identifier
  ) {
    return {
      success: false,
      error: "Oops, something went wrong",
      statusCode: 401,
    };
  }

  try {
    const hashedPassword = await argon2.hash(password);
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });
    await deletePreviousForgotPasswordTokens(existingToken.identifier);
    return { success: true };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}
