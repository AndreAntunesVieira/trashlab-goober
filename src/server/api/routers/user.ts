import {z} from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import {notFoundError} from "@/utils/api";
import UserDB from "@/server/models/user.db";

export const userRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(z.object({email: z.string(), password: z.string()}))
    .mutation(async ({input, ctx}) => {
      const user = new UserDB(ctx).findByEmail(input.email)
      if (!user) throw notFoundError('user not found.')
      return user
    }),
});
