"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail /* sendTwoFactorEmail */ } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { UserSignInSchema } from "@/schemas/schema";
import { AuthError } from "next-auth";
import * as z from "zod";

type Res =
  | { success: true }
  | { success: false; error: string; statusCode: 401 | 500 };

export const userSigninAction = async (
  values: z.infer<typeof UserSignInSchema>
): Promise<Res> => {
  const validatedFields = UserSignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid data entered. Please try again",
      statusCode: 401,
    };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email /*|| !existingUser.password*/) {
    return {
      success: false,
      error: "Email does not exist!",
      statusCode: 401,
    };
  }
  if (!existingUser.password) {
    return {
      success: false,
      error:
        "Email already used with OAuth. Please login using your OAuth provider",
      statusCode: 401,
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token
    );

    return {
      success: false,
      error: "Email not verified. Confirmation email sent again!",
      statusCode: 401,
    };
  }
  // if (existingUser.isTwoFactorEnabled && existingUser.email) {
  //   if (code) {
  //     const twoFactorToken = await getTwoFactorTokenByEmail(
  //       existingUser.email,
  //     );
  //     if (!twoFactorToken) {
  //       return {
  //         error: 'Invalid 2FA code',
  //       };
  //     }
  //     if (twoFactorToken.token !== code) {
  //       return {
  //         error: 'Invalid 2FA code',
  //       };
  //     }
  //     const hasExpired = new Date(twoFactorToken.expires) < new Date();
  //     if (hasExpired) {
  //       return {
  //         error: '2FA code has expired',
  //       };
  //     }
  //     await db.twoFactorToken.delete({
  //       where: {
  //         id: twoFactorToken.id,
  //       },
  //     });
  //     const existingConfirmation = await getTwoFactorConfirmationByUserId(
  //       existingUser.id,
  //     );
  //     if (existingConfirmation) {
  //       await db.twoFactorConfirmation.delete({
  //         where: {
  //           id: existingConfirmation.id,
  //         },
  //       });
  //     }
  //     await db.twoFactorConfirmation.create({
  //       data: {
  //         userId: existingUser.id,
  //       },
  //     });
  //   } else {
  //     const twoFactorToken = await generateTwoFactorToken(
  //       existingUser.email,
  //     );
  //     await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
  //     return {
  //       twoFactor: true,
  //     };
  //   }
  // }
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return {
            success: false,
            error: "Invalid credentials",
            statusCode: 401,
          };
        case "OAuthAccountAlreadyLinked" as AuthError["type"]:
          return {
            success: false,
            error: "Login with your Google or Github account",
            statusCode: 401,
          };
        default:
          return {
            success: false,
            error: "Something went wrong. Please try again later",
            statusCode: 500,
          };
      }
    }
    console.error(error);
    return {
      success: false,
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
};
