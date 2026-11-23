"use client";

import { useActionState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleLogout } from "../_actions/logout";

export function LogoutButton() {
  const [message, logoutAction, isPending] = useActionState(handleLogout, "");

  return (
    <form action={logoutAction} className="space-y-2">
      <Button
        type="submit"
        variant="destructive"
        disabled={isPending}
        className="h-11 w-full cursor-pointer sm:w-auto"
      >
        <LogOut aria-hidden="true" />
        {isPending ? "Saindo..." : "Sair da conta"}
      </Button>
      {message && <p role="alert" className="text-sm text-destructive">{message}</p>}
    </form>
  );
}
