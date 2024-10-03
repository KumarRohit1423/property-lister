import {
  deletePreviousForgotPasswordTokens,
  deletePreviousVerificationTokens,
  getVerificationTokenByEmail,
} from "@/data/token";
import {
  FIVE_MINUTES_IN_MS,
  VERIFICATION_TOKEN_EXPIRY_IN_MS,
} from "@/lib/constants";
import { prisma } from "@/prisma";
import crypto from "crypto";

export const verificationToken = async () => {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes); // Generate random bytes
  return btoa(String.fromCharCode(...bytes))
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 32);
};

export const generateForgotPasswordToken = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    const timeLeft =
      new Date(existingToken.expires).getTime() - new Date().getTime();
    // If more than 5 minutes left, resend the existing token
    if (timeLeft > FIVE_MINUTES_IN_MS) {
      // Resend the same token
      return existingToken;
    } else {
      // If less than 5 minutes left, delete the old token
      await deletePreviousForgotPasswordTokens(existingToken.identifier);
    }
  }
  // generate a new token in case of no token or expired token
  const token = await verificationToken();

  const expires = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY_IN_MS);

  return prisma.forgotPasswordToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });
};

export const generateVerificationToken = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    const timeLeft =
      new Date(existingToken.expires).getTime() - new Date().getTime();
    // If more than 5 minutes left, resend the existing token
    if (timeLeft > FIVE_MINUTES_IN_MS) {
      // Resend the same token
      return existingToken;
    } else {
      // If less than 5 minutes left, delete the old token
      await deletePreviousVerificationTokens(existingToken.identifier);
    }
  }

  // generate a new token in case of no token or expired token
  const token = await verificationToken();

  const expires = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY_IN_MS);

  return prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });
};
