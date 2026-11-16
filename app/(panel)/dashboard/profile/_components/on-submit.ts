"use server";

import { revalidatePath } from "next/cache";
import getSession from "@/lib/getSession";
import { prisma } from "@/lib/prisma";
import { profileSchema, type ProfileFormData } from "./profile-schema";

export async function onSubmit(values: ProfileFormData) {
  const session = await getSession();
  if (!session?.user?.id) return { success: false, message: "Sua sessão expirou. Entre novamente." };
  const parsed = profileSchema.safeParse(values);
  if (!parsed.success) return { success: false, message: "Revise os dados do formulário." };
  const { name, address, phone, status, timeZone, availableHours } = parsed.data;
  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name, address, phone, status: status === "Ativo", timezone: timeZone,
        availableHours: [...new Set(availableHours)].sort() },
    });
  } catch {
    return { success: false, message: "Não foi possível salvar o perfil. Tente novamente." };
  }
  revalidatePath("/dashboard/profile");
  return { success: true, message: "Perfil atualizado com sucesso." };
}
