import {z} from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import RideDB, {type rideStatus} from "@/server/models/ride.db";
import UserDB from "@/server/models/user.db";
import {notFoundError} from "@/utils/api";

const StartRideInputSchema = z.object({
  riderId: z.string(),
  driverId: z.string(),
  pickup: z.string(),
  dropoff: z.string(),
  duration: z.number(),
  distance: z.number(),
  dynamicMultiplier: z.number(),
  price: z.number(),
})

const CancelRideInputSchema = z.object({
  id: z.string(),
  status: z.string(),
})

const CurrentRideInputSchema = z.object({
  id: z.string(), driver: z.boolean().nullable()
})
export const rideRouter = createTRPCRouter({
  availableDrivers: publicProcedure
    .query(async ({ctx}) => {
      return new UserDB(ctx).listAllowedDrivers()
    }),
  searchRiderRequest: publicProcedure
    .input(z.object({driverId: z.string()}))
    .query(async ({input, ctx}) => {
      const ride = await new RideDB(ctx).findCurrent(input.driverId, 'requested')
      if (!ride) throw notFoundError('ride not found.')

      const rider = await new UserDB(ctx).find(ride.riderId)
      return {...ride, rider}
    }),
  currentRide: publicProcedure
    .input(CurrentRideInputSchema)
    .query(async ({input, ctx}) => {
      const ride = await new RideDB(ctx).findCurrent(input.id)
      if (!ride) throw notFoundError('ride not found.')
      if (input.driver) {
        const rider = await new UserDB(ctx).find(input.id)
        return {...ride, rider}
      }
      return ride
    }),
  cancelRide: publicProcedure
    .input(CancelRideInputSchema)
    .mutation(async ({input, ctx}) => {
      const ride = await new RideDB(ctx).find(input.id)
      if (!ride) throw notFoundError('ride not found.')

      const updatedRide = await new RideDB(ctx).changeStatus(input.id, input.status as rideStatus)
      await new UserDB(ctx).setRiding(ride.driverId, false)
      await new UserDB(ctx).setRiding(ride.riderId, false)
      return updatedRide
    }),
  startRide: publicProcedure
    .input(StartRideInputSchema)
    .mutation(async ({input, ctx}) => {
      const ride = await new RideDB(ctx).create(input)
      await new UserDB(ctx).setRiding(input.driverId, true)
      await new UserDB(ctx).setRiding(input.riderId, true)
      return ride
    }),
});
