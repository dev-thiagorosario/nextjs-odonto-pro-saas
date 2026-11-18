"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { deleteService } from "../_actions/delete-service";
import type { ServiceListItem } from "../_types/service";

export function ServiceAvailability({ service }: { service: ServiceListItem }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function changeService(operation: "delete" | "deactivate" | "reactivate") {
    setError("");
    setMessage("");
    startTransition(async () => {
      try {
        const result = await deleteService(service.id, operation);
        if (!result.success) {
          setError(result.message);
          return;
        }
        setMessage(result.message);
        setOpen(false);
      } catch {
        setError("Não foi possível concluir a operação. Tente novamente.");
      }
    });
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {!service.status && (
          <Button type="button" variant="outline" className="min-h-11" disabled={pending}
            aria-label={`Reativar ${service.name}`} onClick={() => changeService("reactivate")}>
            {pending && !open ? "Reativando…" : "Reativar"}
          </Button>
        )}
        <Dialog open={open} onOpenChange={(nextOpen) => {
          if (pending) return;
          setOpen(nextOpen);
          if (nextOpen) setError("");
        }}>
          <DialogTrigger render={<Button type="button" variant="destructive" className="min-h-11" />}
            aria-label={`Excluir ${service.name}`} disabled={pending}>
            <Trash2 aria-hidden="true" />
            Excluir
          </DialogTrigger>
          <DialogContent showCloseButton={false} className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="break-words">Excluir {service.name}?</DialogTitle>
              <DialogDescription>
                A exclusão é definitiva.
                {service.status && " Se quiser recuperar o serviço depois, escolha Desativar."}
              </DialogDescription>
            </DialogHeader>
            {error && <p role="alert" className="text-destructive">{error}</p>}
            {pending && <p role="status">Processando…</p>}
            <DialogFooter>
              <Button type="button" variant="outline" className="min-h-11" disabled={pending}
                onClick={() => setOpen(false)}>Cancelar</Button>
              {service.status && (
                <Button type="button" variant="outline" className="min-h-11" disabled={pending}
                  onClick={() => changeService("deactivate")}>Desativar</Button>
              )}
              <Button type="button" variant="destructive" className="min-h-11" disabled={pending}
                onClick={() => changeService("delete")}>Excluir definitivamente</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {!open && error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
