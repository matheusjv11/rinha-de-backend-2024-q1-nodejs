import { FastifyReply, FastifyRequest } from "fastify";

export class StatementController {
  public static findOne(req: FastifyRequest, res: FastifyReply) {
    return res.send("Não é que funcionou!");
  }
}
