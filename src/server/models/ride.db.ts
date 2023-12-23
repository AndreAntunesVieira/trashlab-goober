import {DefaultArgs, PrismaClientOptions} from "@prisma/client/runtime/library";
import {Prisma, PrismaClient, Ride} from "@prisma/client";
import RideDelegate = Prisma.RideDelegate;

export type rideStatus = "requested" | "started" | "canceled"

interface CreateRideSchema {
  riderId: string;
  driverId: string;
  pickup: string;
  dropoff: string;
  duration: number;
  distance: number;
  dynamicMultiplier: number;
  price: number;
}

export default class RideDB {
  db: RideDelegate<DefaultArgs>

  constructor({db}: { db: PrismaClient }) {
    this.db = db.ride
  }

  find(id: string) {
    return this.db.findFirst({where: {id}})
  }

  findCurrent(id: string, status?: rideStatus) {
    return this.db.findFirst({
      where: {id, status},
      select: {
        driver: true, distance: true, duration: true, riderId: true, price: true,
        dynamicMultiplier: true, status: true, startsAt: true, pickup: true, dropoff: true,
      },
    });
  }

  create(input: CreateRideSchema) {
    return this.db.create({
      data: {...input, startsAt: new Date(), status: 'requested'}
    })
  }

  changeStatus(id: string, status: rideStatus) {
    return this.db.update({data: {status}, where: {id}})
  }
}
