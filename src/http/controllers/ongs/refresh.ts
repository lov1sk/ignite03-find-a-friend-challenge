import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  /**
   * Cria um token e um refresh token para garantir a autenticação da ong
   */

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d", // expira em 7 dias
      },
    }
  );

  /**
   * Retorna os 2 tokens para o cliente, porem o refresh token é encapsulado dentro dos cookies
   * e só pode ser visto pelo backend
   */
  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/", //Todas as rotas do backend podem usar
      secure: true, //Implementa o padrão HTTPs e não deixa o front end usar essa informação
      sameSite: true, //Esse cookie só é valido no nosso dominio
      httpOnly: true, //Só o backend pode usar o cookie
    })
    .status(200)
    .send({ token });
}
