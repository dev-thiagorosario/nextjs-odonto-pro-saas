"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { ServiceListItem } from "../_types/service";
import { ServiceForm } from "./service-form";

interface DialogServiceProps {
  service?: ServiceListItem;
}

export function DialogService({ service }: DialogServiceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-2">
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (isPending) return;
        setIsOpen(open);
        if (open) setMessage("");
      }}>
        <DialogTrigger render={<Button type="button" variant={service ? "outline" : "default"} className="min-h-11" />}
          aria-label={service ? `Editar ${service.name}` : undefined}>
          {service ? <Pencil aria-hidden="true" /> : <Plus aria-hidden="true" />}
          {service ? "Editar" : "Novo serviço"}
        </DialogTrigger>
        <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg" showCloseButton={false}>
          <DialogHeader className="min-w-0">
            <DialogTitle>{service ? "Editar serviço" : "Novo serviço"}</DialogTitle>
            <DialogDescription>
              {service ? "Atualize o nome, o valor e a duração do procedimento." : "Preencha as informações do procedimento para adicioná-lo à sua clínica."}
            </DialogDescription>
          </DialogHeader>
          {isOpen && <ServiceForm service={service} onPendingChange={setIsPending} onSuccess={(successMessage) => {
            setMessage(successMessage);
            setIsOpen(false);
          }} />}
        </DialogContent>
      </Dialog>
      <p role="status" className="max-w-sm text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
