import { createCli, type TrpcCliMeta, trpcServer } from "trpc-cli";
import { z } from "zod";

const t = trpcServer.initTRPC.meta<TrpcCliMeta>().create();

const router = t.router({
	divide: t.procedure
		.meta({
			description: "Divide two numbers.",
		})
		.input(
			z.tuple([
				z.number().describe("numerator"),
				z
					.number()
					.refine((n) => n !== 0)
					.describe("denominator"),
			]),
		)
		.mutation(({ input }) => input[0] / input[1]),
});

void createCli({ router, name: "calculator", version: "1.0.0" }).run();
