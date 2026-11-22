"use server";

import { redirect, RedirectType } from "next/navigation";
import { signOut } from "@/lib/auth";

export async function handleLogout(): Promise<string> {
  try {
    await signOut({ redirect: false, redirectTo: "/" });
  } catch {
    return "Não foi possível sair da conta. Tente novamente.";
  }

  redirect("/", RedirectType.replace);
}
