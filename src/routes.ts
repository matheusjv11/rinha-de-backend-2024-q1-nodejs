import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateTransaction } from "./transaction/application/usecases/create-transaction";
import { TransactionController } from "./transaction/infra/transaction.controller";
import { ClientController } from "./clients/infra/client.controller";

export function configRoutes(server: FastifyInstance) {
  server.post(
    "/clientes/:id/transacoes",
    (
      req: FastifyRequest<{
        Params: { id: number };
        Body: CreateTransaction.Input;
      }>,
      res: FastifyReply
    ) => {
      TransactionController.create(req, res);
    }
  );

  server.get(
    "/clientes/:id/extrato",
    (
      req: FastifyRequest<{
        Params: { id: number };
      }>,
      res
    ) => {
      ClientController.statement(req, res);
    }
  );
}
