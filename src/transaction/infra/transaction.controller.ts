import { FastifyReply, FastifyRequest } from "fastify";

export class TransactionController {
  public static create(req: FastifyRequest, res: FastifyReply) {
    return res.send("Não é que funcionou!");
  }
}
