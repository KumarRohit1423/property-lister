import { authConfig } from "@/auth.config";
import { getUserByEmail } from "@/data/user";
import { verificationToken } from "@/lib/tokens";
import { UserSignInSchema } from "@/schemas/schema";
import argon2 from "argon2";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";
import { OAuthAccountAlreadyLinkedError } from "./lib/custom-error";

const { providers: authConfigProviders, ...authConfigRest } = authConfig;

const nextAuth = NextAuth({
  ...authConfigRest,
  providers: [
    ...authConfigProviders,
    Resend({
      from: process.env.EMAIL_FROM,
      async generateVerificationToken() {
        return verificationToken();
      },
      normalizeIdentifier(identifier: string): string {
        const [local, domainPart] = identifier.toLowerCase().trim().split("@");
        const domain = domainPart.split(",")[0];

        // You can also throw an error, which will redirect the user
        // to the sign-in page with error=EmailSignin in the URL
        if (identifier.split("@").length > 2) {
          throw new Error("Only one email allowed");
        }
        return `${local}@${domain}`;
      },
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      async authorize(credentials) {
        const validatedFields = UserSignInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          console.error("Invalid credentials", validatedFields.error.errors);
          return null;
        }

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          if (!user.password) throw new OAuthAccountAlreadyLinkedError();

          const passwordsMatch = await argon2.verify(user.password, password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
});

export const { signIn, signOut, auth, handlers } = nextAuth;
