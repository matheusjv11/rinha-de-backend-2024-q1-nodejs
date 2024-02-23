import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateTransaction } from "./transaction/application/usecases/create-transaction";
import { TransactionController } from "./transaction/infra/transaction.controller";
import { StatementController } from "./statement/infra/statement.controller";

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

  server.get("/clientes/:id/extrato", (req, res) => {
    StatementController.findOne(req, res);
  });
}
