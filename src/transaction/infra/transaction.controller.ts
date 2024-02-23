import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTransaction } from "../application/usecases/create-transaction";

export class TransactionController {
  public static create(
    req: FastifyRequest<{
      Params: { id: number };
      Body: CreateTransaction.Input;
    }>,
    res: FastifyReply
  ) {
    const result = new CreateTransaction.UseCase().execute({
      ...req.body,
      client_id: req.params.id,
    } as CreateTransaction.Input);

    res.send(result);
  }
}
