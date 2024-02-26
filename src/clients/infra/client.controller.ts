import { FastifyReply, FastifyRequest } from "fastify";
import { GenerateStatement } from "../application/usecases/generate-statement";

export class ClientController {
  public static async statement(
    req: FastifyRequest<{
      Params: { id: number };
    }>,
    res: FastifyReply
  ) {
    const result = await new GenerateStatement.UseCase().execute({
      id: req.params.id,
    });

    return res.send(result);
  }
}
