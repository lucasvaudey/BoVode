import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const adminRouter = createTRPCRouter({
  toggleAdmin: adminProcedure
    .input(z.object({ id: z.string(), activate: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: input.id },
        data: { admin: input.activate },
      });
    }),
});
