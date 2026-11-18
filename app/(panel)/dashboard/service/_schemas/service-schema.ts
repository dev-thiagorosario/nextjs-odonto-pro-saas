import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().trim().min(2, "Informe um nome com pelo menos 2 caracteres.").max(120, "Use até 120 caracteres."),
  price: z.string().trim()
    .regex(/^\d{1,8}([.,]\d{1,2})?$/, "Informe um valor entre 0 e 99999999,99, com até 2 casas decimais.")
    .transform((value) => value.replace(",", ".")),
  duration: z.number({ error: "Informe a duração em minutos." })
    .int("Informe uma quantidade inteira de minutos.")
    .min(1, "A duração deve ser de pelo menos 1 minuto.")
    .max(2147483647, "A duração informada é muito alta."),
});

export const serviceIdSchema = z.uuid("Serviço inválido.");
export type ServiceFormData = z.infer<typeof serviceSchema>;
export type ServiceFieldErrors = Partial<Record<keyof ServiceFormData, string[]>>;
export type ServiceActionResult =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: ServiceFieldErrors };
