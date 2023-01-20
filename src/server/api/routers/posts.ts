import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  createPost: adminProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          content: input.content,
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
  deletePost: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.delete({
        where: { id: input.id },
      });
    }),
  updatePost: adminProcedure
    .input(z.object({ id: z.number(), title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.update({
        where: { id: input.id },
        data: {
          content: input.content,
          title: input.title,
        },
      });
    }),
  posts: publicProcedure
    .input(z.object({ take: z.number().nullish(), skip: z.number().nullish() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findMany({
        skip: input.skip ?? undefined,
        take: input.take ?? undefined,
        include: { user: { select: { name: true } } },
      });
    }),

  post: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findUnique({
        where: { id: input.id },
      });
    }),
});
