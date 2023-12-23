import {z} from "zod";
import crypto from "node:crypto";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import {TRPCError} from "@trpc/server";

export const rideRouter = createTRPCRouter({
  availableDrivers: publicProcedure
    .query(async ({ctx}) => {
      const drivers = await ctx.db.user.findMany({
        select: {id: true, name: true, image: true, carCategory: true},
        where: {riding: false, roleId: 'driver'},
      });
      return drivers
    }),
  searchRiderRequest: publicProcedure
    .input(z.object({driverId: z.string()}))
    .query(async ({input, ctx}) => {
      const ride = await ctx.db.ride.findFirst({
        select: {
          id: true, distance: true, duration: true, riderId: true,
          dynamicMultiplier: true, status: true, startsAt: true, price: true, pickup: true, dropoff: true,
        },
        where: {status: 'requested', driverId: input.driverId},
      });
      if(!ride){
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'ride not found.'
        });
      }
      const rider = await ctx.db.user.findFirst({ where: {id: ride.riderId }})
      return {...ride, rider }
    }),
  currentRide: publicProcedure
    .input(z.object({id: z.string(), driver: z.boolean().nullable()}))
    .query(async ({input, ctx}) => {
      const ride = await ctx.db.ride.findFirst({
        select: {
          driver: true, distance: true, duration: true, riderId: true,
          dynamicMultiplier: true, status: true, startsAt: true, price: true, pickup: true, dropoff: true,
        },
        where: {id: input.id},
      });
      if(!ride){
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'ride not found.'
        });
      }
      if(input.driver) {
        const rider = await ctx.db.user.findFirst({ where: {id: ride.riderId }})
        return {...ride, rider}
      }
      return ride
    }),
  cancelRide: publicProcedure
    .input(z.object({
      id: z.string(),
      status: z.string(),
    }))
    .mutation(async ({input, ctx}) => {
      const ride = await ctx.db.ride.findFirst({ where: {id: input.id } })
      if(!ride){
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'ride not found.'
        });
      }

      const update1 = await ctx.db.ride.update({
        data: { status: input.status },
        where: {id: input.id }
      })
      const update2 = await ctx.db.user.update({
        data: {riding: false},
        where: { id: ride.driverId }
      })
      const update3 = await ctx.db.user.update({
        data: {riding: false},
        where: { id: ride.riderId }
      })
      return [update1, update2, update3]
    }),
  startRide: publicProcedure
    .input(z.object({
      riderId: z.string(),
      driverId: z.string(),
      pickup: z.string(),
      dropoff: z.string(),
      duration: z.number(),
      distance: z.number(),
      dynamicMultiplier: z.number(),
      price: z.number(),
    }))
    .mutation(async ({input, ctx}) => {
      const ride = await ctx.db.ride.create({
        data: {...input, startsAt: new Date(), status: 'requested'}
      })

      await ctx.db.user.update({
        data: {riding: true},
        where: {id: input.driverId}
      })
      return ride
    }),
});
