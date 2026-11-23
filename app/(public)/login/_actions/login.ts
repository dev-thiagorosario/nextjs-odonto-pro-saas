"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "@/lib/auth";

export async function loginWithGitHub(destination: string) {
  const redirectTo =
    destination === "/dashboard/service" ? destination : "/dashboard/profile";

  try {
    await signIn("github", { redirectTo });
  } catch (error) {
    if (!(error instanceof AuthError)) {
      throw error;
    }

    console.error(error);
    const params = new URLSearchParams({ error: error.type, callbackUrl: redirectTo });
    redirect(`/login?${params}`);
  }
}
