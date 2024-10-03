import {
  getForgotPasswordEmailTemplate,
  getVerifyEmailTemplate,
} from "@/components/email/email-templates";
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;
const emailFrom =
  process.env.EMAIL_FROM ||
  "Property Listers <propertylisters@rohit-choudhary.me>";

export const sendForgotPasswordEmail = async (email: string, token: string) => {
  const resetPasswordLink = `${domain}/auth/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: emailFrom,
      to: email /*['delivered@resend.dev'],*/,
      ...getForgotPasswordEmailTemplate(resetPasswordLink),
    });
    console.log(`Forgot password email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send forgot password email to ${email}:`, error);
    throw new Error(
      "Failed to send forgot password email. Please try again later."
    );
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verify?token=${token}`;

  await resend.emails.send({
    from: emailFrom,
    to: email,
    ...getVerifyEmailTemplate(confirmLink),
  });
};
