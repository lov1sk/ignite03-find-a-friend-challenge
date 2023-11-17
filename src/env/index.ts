import "dotenv/config";
import { z } from "zod";

/**
 * Cria um schema para tipar as variaveis de ambiente
 */

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "prod"]),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3434),
  JWT_SECRET: z.coerce.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error("Invalid environment variable: ");
}

export const env = parsedEnv.data;
