import Fastify from "fastify";
import { configRoutes } from "./routes";

const server = Fastify();

configRoutes(server);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server runnig at ${address}`);
});
