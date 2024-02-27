import { FastifyReply } from "fastify";

export interface DefaultUseCase<Input, Output> {
  execute(input: Input, res: FastifyReply): Output | Promise<Output>;
}
