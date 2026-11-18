"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import getSession from "@/lib/getSession";
import { prisma } from "@/lib/prisma";
import { serviceIdSchema, type ServiceActionResult } from "../_schemas/service-schema";

const operationSchema = z.enum(["delete", "deactivate", "reactivate"]);

export async function deleteService( id: unknown, operation: unknown = "delete",): Promise<ServiceActionResult> {

  const session = await getSession();
  if (!session?.user?.id) {
    return { success: false, message: "Sua sessão expirou. Entre novamente." };
  }

  const parsedId = serviceIdSchema.safeParse(id);
  const parsedOperation = operationSchema.safeParse(operation);
  if (!parsedId.success || !parsedOperation.success) {
    return {
       success: false,
       message: "Serviço ou operação inválida."
      };
  }

  const action = parsedOperation.data;
  const where = { id: parsedId.data, userId: session.user.id };

  try {
    const result = action === "delete"
      ? await prisma.service.deleteMany({ where })
      : await prisma.service.updateMany({
          where,
          data: { status: action === "reactivate" },
        });

    if (result.count === 0) {
      return {
        success: false,
        message: "Serviço não encontrado."
      };
    }
  } catch (error) {
    if (
      action === "delete" &&
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return {
        success: false,
        message: "Este serviço tem agendamentos vinculados. Você pode desativá-lo para preservar o histórico.",
      };
    }

    console.error("Falha ao alterar a disponibilidade do serviço:", error);
    return { success: false, message: "Não foi possível concluir a operação. Tente novamente." };
  }

  revalidatePath("/dashboard/service");
  const messages = {
    delete: "Serviço excluído com sucesso.",
    deactivate: "Serviço desativado com sucesso.",
    reactivate: "Serviço reativado com sucesso.",
  };
  return { success: true, message: messages[action] };
}
