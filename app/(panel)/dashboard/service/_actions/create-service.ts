"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import getSession from "@/lib/getSession";
import { prisma } from "@/lib/prisma";
import { serviceSchema, type ServiceActionResult } from "../_schemas/service-schema";

export async function createService(values: unknown): Promise<ServiceActionResult> {
  const session = await getSession();

  if (!session?.user?.id)
    return {
      success: false, message: "Sua sessão expirou. Entre novamente."
  };

  const parsed = serviceSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false, message: "Revise os dados do formulário.", fieldErrors: z.flattenError(parsed.error).fieldErrors
    };
  }

  try {
    await prisma.service.create({
      data: { ...parsed.data, userId: session.user.id },
    });
  } catch (error) {
    console.error("Falha ao criar serviço:", error);
    return {
      success: false,
      message: "Não foi possível cadastrar o serviço. Tente novamente."
    };
  }

  revalidatePath("/dashboard/service");
  return {
    success: true,
    message: "Serviço cadastrado com sucesso."
  };
}
