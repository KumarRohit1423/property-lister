"use server";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { prisma } from "@/prisma";
import { UserSignUpSchema } from "@/schemas/schema";
import argon2 from "argon2";
import * as z from "zod";

type Res =
  | { success: true }
  | {
      success: false;
      error: z.typeToFlattenedError<z.infer<typeof UserSignUpSchema>>;
      statusCode: 400;
    }
  | { success: false; error: string; statusCode: 409 | 500 };

export async function credentialSignupAction(
  values: z.infer<typeof UserSignUpSchema>
): Promise<Res> {
  const validatedFields = UserSignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    const flatErrors = validatedFields.error.flatten();
    console.log(flatErrors);
    return {
      success: false,
      error: flatErrors,
      statusCode: 400,
    };
  }

  const { email, name, password } = validatedFields.data;
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser?.id) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
          existingUser.email
        );
        await sendVerificationEmail(
          existingUser.email,
          verificationToken.token
        );

        return {
          success: false,
          error: "User exists but not verified. Verification link resent",
          statusCode: 409,
        };
      } else if (existingUser.password === null) {
        return {
          success: false,
          error:
            "Email already used with OAuth. Please login using your OAuth provider",
          statusCode: 409,
        };
      } else {
        return {
          success: false,
          error: "Email already exists. Login to continue",
          statusCode: 409,
        };
      }
    }
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
  try {
    const hashedPassword = await argon2.hash(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(newUser.email);
    await sendVerificationEmail(newUser.email, verificationToken.token);

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
