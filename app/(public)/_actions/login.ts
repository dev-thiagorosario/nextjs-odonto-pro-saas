"use server";

import { signIn } from "@/lib/auth";

export async function handleRegister(provider: "github") {
  if (provider !== "github") {
    throw new Error("Provedor de autenticação inválido.");
  }

  await signIn(provider, { redirectTo: "/dashboard" });
}
