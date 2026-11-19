"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ServicesRetry() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button type="button" variant="outline" className="min-h-11" disabled={isPending}
      onClick={() => startTransition(() => router.refresh())}>
      {isPending ? "Carregando..." : "Tentar novamente"}
    </Button>
  );
}
