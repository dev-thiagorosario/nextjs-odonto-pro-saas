"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import getSession from "@/lib/getSession";
import { prisma } from "@/lib/prisma";
import { serviceIdSchema, serviceSchema, type ServiceActionResult } from "../_schemas/service-schema";

export async function updateService(id: unknown, values: unknown): Promise<ServiceActionResult> {
  const session = await getSession();

  if (!session?.user?.id)
    return {
      success: false,
      message: "Sua sessão expirou. Entre novamente."
    };

  const parsedId = serviceIdSchema.safeParse(id);
  if (!parsedId.success)
    return {
      success: false,
      message: "Serviço inválido."
    };

  const parsed = serviceSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Revise os dados do formulário.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  try {
    // Scope the write itself to the authenticated owner to avoid authorization races.
    const result = await prisma.service.updateMany({
      where: { id: parsedId.data, userId: session.user.id, status: true },
      data: parsed.data,
    });

    if (result.count === 0)
      return {
        success: false,
        message: "Serviço não encontrado ou indisponível para edição."
      };

  } catch (error) {
    console.error("Falha ao atualizar serviço:", error);
    return {
      success: false,
      message: "Não foi possível atualizar o serviço. Tente novamente."
    };
  }

  revalidatePath("/dashboard/service");
  return {
    success: true,
    message: "Serviço atualizado com sucesso."
  };
}
