import Fastify from "fastify";
import { TransactionController } from "./transaction/infra/transaction.controller";
import { StatementController } from "./statement/infra/statement.controller";

const server = Fastify();

server.get("/", (_, res) => {
  res.send("I'm working");
});

server.post("/clientes/:id/transacoes", (req, res) => {
  TransactionController.create(req, res);
});

server.get("/clientes/:id/extrato", (req, res) => {
  StatementController.findOne(req, res);
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server runnig at ${address}`);
});
