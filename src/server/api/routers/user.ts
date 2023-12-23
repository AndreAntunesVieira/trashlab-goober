import { z } from "zod";
import crypto from "node:crypto";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {TRPCError} from "@trpc/server";

const VALID_SESSION_DAYS = 7
export const userRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async({ input, ctx }) => {
      const user = await ctx.db.user.findFirst({
        select:{id:true, name:true, roleId: true, image:true},
        where: { email: input.email },
      });
      if(!user){
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'user not found.'
        });
      }
      const expires = new Date()
      expires.setDate(expires.getDate() + VALID_SESSION_DAYS);
      const session = await ctx.db.session.create({ data: {sessionToken: crypto.randomUUID(), userId: user.id, expires: expires}})
      return {user, sessionToken: session.sessionToken }
    }),
});
