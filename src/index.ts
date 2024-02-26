import Fastify from "fastify";
import { configRoutes } from "./routes";
import { connect } from "./shared/infra/database/postgres/postgres.client";

const server = Fastify();

configRoutes(server);

server.listen({ port: 8080 }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  await connect();

  console.log(`Server runnig at ${address}`);
});
