"use client";

import { ArrowUpRight } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="min-h-12 w-full cursor-pointer justify-between rounded-xl bg-emerald-800 px-4 text-base text-white hover:bg-emerald-900 focus-visible:ring-emerald-600/50"
    >
      {pending ? "Abrindo o GitHub…" : "Continuar com GitHub"}
      <ArrowUpRight className="size-5" aria-hidden="true" />
    </Button>
  );
}

export function LoginForm({ action }: { action: () => Promise<void> }) {
  return (
    <form action={action}>
      <LoginButton />
    </form>
  );
}
