import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  /**
   * Se a variavel de ambiente estiver como dev, exibe todos os logs para as querys feitas,
   * porem se o ambiente for de produção, apenas exibe logs para erros
   */
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
