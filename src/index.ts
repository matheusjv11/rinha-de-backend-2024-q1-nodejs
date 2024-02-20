import Fastify from "fastify";

const server = Fastify();

server.get("/", (req, res) => {
  res.send("Hellooo");
});

server.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server runnig at ${address}`);
});
