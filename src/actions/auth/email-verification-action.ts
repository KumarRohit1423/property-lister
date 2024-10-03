"use server";

import { getVerificationTokenByToken } from "@/data/token";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/prisma";

export const emailVerificationAction = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      success: false,
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      success: false,
    };
  }

  const existingUser = await getUserByEmail(existingToken.identifier);
  if (
    existingUser?.id &&
    !existingUser.emailVerified &&
    existingUser.email === existingToken.identifier
  ) {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.identifier,
      },
    });
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: existingToken.identifier,
          token: existingToken.token,
        },
      },
    });

    return { success: true };
  } else {
    return { success: false };
  }
};
