import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  try {
    const result = await prisma.$queryRaw<
      { database: string; version: string }[]
    >`SELECT current_database() AS database, version() AS version`;
    console.table(result);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(() => {
  console.error("Não foi possível conectar ao banco. Confira o .env e execute npm run db:up.");
  process.exitCode = 1;
});
