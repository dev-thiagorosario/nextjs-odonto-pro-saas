"use client";

import { useId } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createService } from "../_actions/create-service";
import { updateService } from "../_actions/update-service";
import type { ServiceFormData } from "../_schemas/service-schema";
import { useDialogServiceForm } from "./dialog-service-form";
import type { ServiceListItem } from "../_types/service";

interface ServiceFormProps {
  service?: ServiceListItem;
  onSuccess: (message: string) => void;
  onPendingChange: (pending: boolean) => void;
}

export function ServiceForm({ service, onSuccess, onPendingChange }: ServiceFormProps) {
  const id = useId();
  const form = useDialogServiceForm(service);
  const { errors, isSubmitting } = form.formState;

  async function onSubmit(values: ServiceFormData) {
    onPendingChange(true);
    form.clearErrors("root");
    try {
      const result = service ? await updateService(service.id, values) : await createService(values);
      if (!result.success) {
        form.setError("root", { message: result.message });
        if (result.fieldErrors) {
          for (const field of ["name", "price", "duration"] as const) {
            const message = result.fieldErrors[field]?.[0];
            if (message) form.setError(field, { message }, { shouldFocus: true });
          }
        }
        return;
      }
      onSuccess(result.message);
    } catch {
      form.setError("root", { message: "Não foi possível salvar o serviço. Verifique sua conexão e tente novamente." });
    } finally {
      onPendingChange(false);
    }
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" aria-busy={isSubmitting}
      onChange={() => form.clearErrors("root")}>
      {errors.root?.message && <p role="alert" className="text-sm text-destructive">{errors.root.message}</p>}
      <fieldset disabled={isSubmitting} className="min-w-0">
        <legend className="sr-only">Informações do serviço</legend>
        <FieldGroup>
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor={`${id}-name`}>Nome do serviço</FieldLabel>
            <Input id={`${id}-name`} className="min-h-11" placeholder="Ex.: Limpeza dental" maxLength={120} required
              aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-error` : undefined} {...form.register("name")} />
            <FieldError id={`${id}-name-error`} errors={[errors.name]} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={!!errors.price}>
              <FieldLabel htmlFor={`${id}-price`}>Valor (R$)</FieldLabel>
              <Input id={`${id}-price`} className="min-h-11" inputMode="decimal" placeholder="150,00" required
                aria-invalid={!!errors.price} aria-describedby={`${id}-price-hint${errors.price ? ` ${id}-price-error` : ""}`} {...form.register("price")} />
              <FieldDescription id={`${id}-price-hint`}>Use até duas casas decimais, sem separador de milhar.</FieldDescription>
              <FieldError id={`${id}-price-error`} errors={[errors.price]} />
            </Field>
            <Field data-invalid={!!errors.duration}>
              <FieldLabel htmlFor={`${id}-duration`}>Duração (minutos)</FieldLabel>
              <Input id={`${id}-duration`} className="min-h-11" type="number" inputMode="numeric" min={1} max={2147483647} step={1} placeholder="30" required
                aria-invalid={!!errors.duration} aria-describedby={errors.duration ? `${id}-duration-error` : undefined}
                {...form.register("duration", { valueAsNumber: true })} />
              <FieldError id={`${id}-duration-error`} errors={[errors.duration]} />
            </Field>
          </div>
        </FieldGroup>
      </fieldset>
      <DialogFooter>
        <DialogClose disabled={isSubmitting} render={<Button type="button" variant="outline" className="min-h-11" />}>Cancelar</DialogClose>
        <Button type="submit" className="min-h-11" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : service ? "Salvar alterações" : "Cadastrar serviço"}
        </Button>
      </DialogFooter>
    </form>
  );
}
