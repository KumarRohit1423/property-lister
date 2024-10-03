"use server";

import { prisma } from "@/prisma";

export async function oauthVerifyEmailAction(email: string) {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
      password: null,
      emailVerified: null,
    },
    select: {
      id: true, // Only select the ID field
    },
  });

  if (existingUser?.id) {
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });
  }
}
