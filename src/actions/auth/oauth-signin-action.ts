"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function oauthSignin(provider: "google" | "github") {
  try {
    await signIn(provider, { redirectTo: "/" });
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    console.error(err);
  }
}
