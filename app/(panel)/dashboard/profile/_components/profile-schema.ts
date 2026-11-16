import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "O nome é obrigatório").max(150),
  address: z.string().trim().max(500).optional(),
  phone: z.string().trim().max(30).optional(),
  status: z.enum(["Ativo", "Inativo"]),
  timeZone: z.string().refine((value) => {
    try { new Intl.DateTimeFormat("pt-BR", { timeZone: value }); return !!value; }
    catch { return false; }
  }, "Selecione um fuso horário válido"),
  availableHours: z.array(z.string().regex(/^(?:0[89]|1[0-9]|2[0-3]):(?:00|30)$/)).max(32),

});
export type ProfileFormData = z.infer<typeof profileSchema>;
