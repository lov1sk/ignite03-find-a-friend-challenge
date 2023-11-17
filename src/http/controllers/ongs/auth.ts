import { InvalidOngPasswordError } from "@/use-cases/errors/invalid-ong-password-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeAuthenticateOngUseCase } from "@/use-cases/factories/make-authenticate-ong-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const ongAuthenticationRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = ongAuthenticationRequestSchema.parse(
    request.body
  );

  try {
    const authenticateOngUseCase = makeAuthenticateOngUseCase();

    const { ong } = await authenticateOngUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: ong.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: ong.id,
          expiresIn: "7d", // expira em 7 dias
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/", //Todas as rotas do backend podem usar
        secure: true, //Implementa o padrão HTTPs e não deixa o front end usar essa informação
        sameSite: true, //Esse cookie só é valido no nosso dominio
        httpOnly: true, //Só o backend pode usar o cookie
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (
      error instanceof ResourceNotFoundError ||
      error instanceof InvalidOngPasswordError
    ) {
      return reply.status(401).send({ message: error.message });
    }
  }
}
