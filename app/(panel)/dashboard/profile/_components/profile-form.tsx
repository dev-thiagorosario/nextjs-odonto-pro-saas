"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "./profile-schema";
export type { ProfileFormData } from "./profile-schema";

interface UseProfileFormProps {
  name: string | null;
  address: string | null;
  phone: string | null;
  status: boolean;
  timeZone: string | null;
  availableHours: string[];
}

export function useProfileForm(user: UseProfileFormProps) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name ?? "",
      address: user.address ?? "",
      phone: user.phone ?? "",
      status: user.status ? "Ativo" : "Inativo",
      timeZone: user.timeZone ?? "America/Bahia",
      availableHours: user.availableHours,
    },
  });
}
