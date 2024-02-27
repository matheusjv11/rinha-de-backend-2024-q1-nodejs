import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTransaction } from "../application/usecases/create-transaction";

export class TransactionController {
  public static async create(
    req: FastifyRequest<{
      Params: { id: number };
      Body: CreateTransaction.Input;
    }>,
    res: FastifyReply
  ) {
    const useCaseInput = {
      ...req.body,
      client_id: req.params.id,
    } as CreateTransaction.Input;

    const result = await new CreateTransaction.UseCase().execute(
      useCaseInput,
      res
    );

    res.send(result);
  }
}
