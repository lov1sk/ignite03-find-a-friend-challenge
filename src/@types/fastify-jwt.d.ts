import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {}; // payload type is used for signing and verifying
    user: {
      sub: string;
      a: string;
    }; // user type is return type of `request.user` object
  }
}
