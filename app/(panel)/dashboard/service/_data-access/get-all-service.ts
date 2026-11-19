import "server-only";

import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import { prisma } from "@/lib/prisma";
import type { ServiceListItem } from "../_types/service";

/** Resultado padronizado da busca de serviços. */
type GetAllServicesResult =
  | { success: true; data: ServiceListItem[] }
  | { success: false; error: string };

/** Busca todos os serviços do usuário autenticado. */
export async function getAllServices(): Promise<GetAllServicesResult> {
  const session = await getSession();

  // Redireciona para o login caso não haja sessão ativa
  if (!session?.user?.id) {
    redirect("/api/auth/signin?callbackUrl=%2Fdashboard%2Fservice");
  }

  try {
    const services = await prisma.service.findMany({
      where: { userId: session.user.id },
      select: { id: true, name: true, price: true, duration: true, status: true },
      orderBy: [{ status: "desc" }, { name: "asc" }, { id: "asc" }],
    });

    return {
      success: true,

      // O tipo Decimal do Prisma não é serializável na fronteira entre Servidor e Cliente.
      data: services.map((service) => ({
        ...service,
        price: service.price.toFixed(2),
      })),
    };
  } catch (error) {
    console.error("Falha ao buscar serviços:", error);
    return {
      success: false,
      error: "Não foi possível carregar os serviços. Tente novamente.",
    };
  }
}
