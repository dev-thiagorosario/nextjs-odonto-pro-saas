import "server-only";

import { prisma } from "@/lib/prisma";


interface GetUserDataProps{
  userId: string;
}

export async function getUserData({ userId }: GetUserDataProps){
  try{
    const user = await prisma.user.findUnique({
      select: {
        name: true,
        address: true,
        phone: true,
        status: true,
        timezone: true,
        image: true,
        availableHours: true,
      },
      where: {
        id: userId
      }
    })

    return user
  } catch(error){
    console.error("Error ao buscar dados do usuario", error)
    throw new Error("Não foi possivel carregar os dados do usuario")
  }
}
