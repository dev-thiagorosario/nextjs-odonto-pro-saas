'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const profileSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.enum(["Ativo", "Inativo"]),
  timeZone: z.string().min(1, { message: "O fuso horário é obrigatório" }),
  availableHours: z.array(z.string().regex(/^(?:0[89]|1[0-9]|2[0-3]):(?:00|30)$/))
})

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm() {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      status: "Ativo",
      timeZone: "",
      availableHours: []
    }
  })
}
