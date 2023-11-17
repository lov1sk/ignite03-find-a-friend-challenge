import { fastify } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ongsRoutes } from "./http/controllers/ongs";
import { ZodError } from "zod";
import { env } from "./env";
import { petsRoutes } from "./http/controllers/pets";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false, // Digo que o refresh token não é um token assinado
  },
  sign: {
    expiresIn: "10m",
  },
});
app.register(fastifyCookie);
app.register(ongsRoutes);
app.register(petsRoutes);
app.setErrorHandler((error, _request, reply) => {
  // se for um erro de validação,ele retorna o StatusCode 400 para o cliente
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  /**
   * Aqui diz respeito aos logs e a stack trace de erros que a aplicação gerou
   * se estivermos em desenvolvimento ele deve mostrar no console o que aconteceu
   * se estivermos em produção, deve armazenar o log
   */
  if (env.NODE_ENV !== "prod") {
    console.error(error);
  } else {
    // TODO: handle error on an external tool
  }

  return reply.status(500).send({ message: "Internal server error" });
});
