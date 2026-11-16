"use client"

import { useState, useTransition } from "react";
import Image from "next/image";
import imgTest from "@/public/images/profile-test.png";
import { onSubmit } from "./on-submit";
import { useWatch } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useProfileForm } from "./profile-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import type { getUserData } from "../_data-access/get-info-user";

const timeZones = [
  { value: "America/Noronha", label: "Fernando de Noronha" },
  { value: "America/Sao_Paulo", label: "Brasília / São Paulo" },
  { value: "America/Bahia", label: "Bahia" },
  { value: "America/Fortaleza", label: "Fortaleza" },
  { value: "America/Belem", label: "Belém" },
  { value: "America/Manaus", label: "Manaus" },
  { value: "America/Cuiaba", label: "Cuiabá" },
  { value: "America/Porto_Velho", label: "Porto Velho" },
  { value: "America/Boa_Vista", label: "Boa Vista" },
  { value: "America/Rio_Branco", label: "Rio Branco" },
];

function generateTimeSlots(): string[] {
  const hours: string[] = [];

  for (let hour = 8; hour < 24; hour++) {
    hours.push(`${String(hour).padStart(2, "0")}:00`);
    hours.push(`${String(hour).padStart(2, "0")}:30`);
  }

  return hours;
}

const timeSlots = generateTimeSlots();

const selectClassName = "h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive";

interface ProfileContentProps {
  user: NonNullable<Awaited<ReturnType<typeof getUserData>>>;
}

export function ProfileContent({ user }: ProfileContentProps) {
  const form = useProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone,
    status: user.status,
    timeZone: user.timezone,
    availableHours: user.availableHours,
  });
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const { errors } = form.formState;
  const selectedHours = useWatch({ control: form.control, name: "availableHours" });

  function toggleHour(hour: string) {
    const hours = form.getValues("availableHours");
    form.setValue(
      "availableHours",
      hours.includes(hour) ? hours.filter((value) => value !== hour) : [...hours, hour].sort(),
      { shouldDirty: true, shouldValidate: true },
    );
    setMessage("");
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        noValidate
        onChange={() => setMessage("")}
        onSubmit={form.handleSubmit((values) => {
          startTransition(async () => {
            try {
              const result = await onSubmit(values);
              setMessage(result.message);
            } catch {
              setMessage("Não foi possível salvar o perfil. Tente novamente.");
            }
          });
        }, () => setMessage(""))}
      >
        <Card>
          <CardHeader>
            <CardTitle>Meu perfil</CardTitle>
            <CardDescription>Preencha as informações da sua clínica.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full bg-muted">
                <Image src={user.image ? user.image : imgTest} alt="Foto da clínica" fill sizes="128px" className="object-cover" />
              </div>
            </div>

            <FieldGroup>
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="profile-name">Nome da clínica</FieldLabel>
                <Input id="profile-name" autoComplete="organization" placeholder="Digite o nome da clínica" aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? "profile-name-error" : undefined} {...form.register("name")} />
                <FieldError id="profile-name-error" errors={[errors.name]} />
              </Field>

              <Field data-invalid={!!errors.address}>
                <FieldLabel htmlFor="profile-address">Endereço</FieldLabel>
                <Input id="profile-address" autoComplete="street-address" placeholder="Rua, número, bairro e cidade" aria-invalid={!!errors.address} aria-describedby={errors.address ? "profile-address-error" : undefined} {...form.register("address")} />
                <FieldError id="profile-address-error" errors={[errors.address]} />
              </Field>

              <Field data-invalid={!!errors.phone}>
                <FieldLabel htmlFor="profile-phone">Telefone</FieldLabel>
                <Input id="profile-phone" type="tel" autoComplete="tel" placeholder="(71) 99999-9999" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "profile-phone-error" : undefined} {...form.register("phone")} />
                <FieldError id="profile-phone-error" errors={[errors.phone]} />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field data-invalid={!!errors.status}>
                  <FieldLabel htmlFor="profile-status">Status</FieldLabel>
                  <select id="profile-status" className={selectClassName} aria-invalid={!!errors.status} aria-describedby={errors.status ? "profile-status-error" : undefined} {...form.register("status")}>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                  <FieldError id="profile-status-error" errors={[errors.status]} />
                </Field>

                <Field data-invalid={!!errors.timeZone}>
                  <FieldLabel htmlFor="profile-timezone">Fuso horário</FieldLabel>
                  <select id="profile-timezone" className={selectClassName} aria-required="true" aria-invalid={!!errors.timeZone} aria-describedby={errors.timeZone ? "profile-timezone-error" : undefined} {...form.register("timeZone")}>
                    <option value="" disabled>Selecione o fuso horário</option>
                    {timeZones.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                  </select>
                  <FieldError id="profile-timezone-error" errors={[errors.timeZone]} />
                </Field>
              </div>
            </FieldGroup>


            <div className="space-y-2">
              <p className="text-sm font-medium">Horários de atendimento</p>
              <Dialog>
                <DialogTrigger render={<Button type="button" variant="outline" className="w-full" />}>
                  Selecionar horários disponíveis <ArrowRight aria-hidden="true" />
                </DialogTrigger>

                <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Horários da clínica</DialogTitle>
                    <DialogDescription>
                      Selecione os horários de funcionamento da clínica. Os horários seguem o fuso escolhido no perfil.
                    </DialogDescription>
                  </DialogHeader>
                  <section className="space-y-4 py-2" aria-label="Horários disponíveis">
                    <p className="text-sm text-muted-foreground">
                      Clique nos horários abaixo para marcar ou desmarcar:
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {timeSlots.map((hour) => (
                        <Button
                          key={hour}
                          type="button"
                          variant={selectedHours.includes(hour) ? "default" : "outline"}
                          aria-pressed={selectedHours.includes(hour)}
                          onClick={() => toggleHour(hour)}
                        >
                          {hour}
                        </Button>
                      ))}
                    </div>
                  </section>
                  <DialogFooter>
                    <DialogClose render={<Button type="button" />}>Concluir</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <p role="status" className="text-sm text-muted-foreground">
                {selectedHours.length > 0
                  ? `Horários selecionados: ${selectedHours.join(", ")}`
                  : "Nenhum horário selecionado."}
              </p>
            </div>

            <div className="space-y-3">
              <Button type="submit" disabled={isPending} className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 cursor-pointer">{isPending ? "Salvando..." : "Salvar alterações"}</Button>
              {message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
