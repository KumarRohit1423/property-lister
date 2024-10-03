"use server";

import { signIn } from "@/auth";
import { EmailSchema } from "@/schemas/schema";
import * as z from "zod";

export async function magiclinkSigninAction(values: {
  email: z.infer<typeof EmailSchema>;
}) {
  try {
    await signIn("resend", values);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
