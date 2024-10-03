import { prisma } from "@/prisma";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await prisma.verificationToken.findFirst({
      where: { token: token },
    });
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await prisma.verificationToken.findFirst({
      where: { identifier: email },
    });
  } catch {
    return null;
  }
};

export const deletePreviousVerificationTokens = async (identifier: string) => {
  try {
    return await prisma.verificationToken.deleteMany({
      where: { identifier },
    });
  } catch {
    return null;
  }
};

export const getForgotPasswordTokenByToken = async (token: string) => {
  try {
    return await prisma.forgotPasswordToken.findFirst({
      where: {
        token: token,
      },
    });
  } catch {
    return null;
  }
};

export const getForgotPasswordTokenByEmail = async (email: string) => {
  try {
    return await prisma.forgotPasswordToken.findFirst({
      where: {
        identifier: email,
      },
    });
  } catch {
    return null;
  }
};

export const deletePreviousForgotPasswordTokens = async (
  identifier: string
) => {
  try {
    return await prisma.forgotPasswordToken.deleteMany({
      where: { identifier },
    });
  } catch {
    return null;
  }
};
