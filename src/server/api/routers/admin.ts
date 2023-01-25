import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const adminRouter = createTRPCRouter({
  toggleAdmin: adminProcedure
    .input(z.object({ id: z.string(), activate: z.boolean() }))
    .mutation(({ ctx, input }) => {
      if (ctx.session?.user?.id === input.id) {
        throw new Error("Cannot toggle admin on yourself");
      }
      return ctx.prisma.user.update({
        where: { id: input.id },
        data: { admin: input.activate },
      });
    }),
  users: adminProcedure
    .input(z.object({ take: z.number(), skip: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findMany({ take: input.take, skip: input.skip });
    }),
});
