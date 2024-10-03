"use server";

import { signOut } from "@/auth";

export async function userSignoutAction() {
  try {
    await signOut({ redirect: false });
  } catch (err) {
    console.error(err);
  }
}
