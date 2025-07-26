import { initTRPC } from "@trpc/server";
import { createCli } from "trpc-cli";
import { z } from "zod";

const t = initTRPC.create();

export const router = t.router({
	add: t.procedure
		.input(
			z.object({
				left: z.number().describe("left"),
				right: z.number().describe("right"),
			}),
		)
		.query(({ input }) => input.left + input.right),
});

const cli = createCli({ router });
cli.run();
