import {DefaultArgs} from "@prisma/client/runtime/library";
import {Prisma, PrismaClient} from "@prisma/client";
import UserDelegate = Prisma.UserDelegate;


export default class UserDB {
  db: UserDelegate<DefaultArgs>

  constructor({db}: { db: PrismaClient }) {
    this.db = db.user
  }

  find(id: string) {
    return this.db.findFirst({where: {id}})
  }

  findByEmail(email: string) {
    return this.db.findFirst({
      where: {email},
      select: {id: true, name: true, roleId: true, image: true},
    });
  }

  listAllowedDrivers() {
    return this.db.findMany({
      select: {id: true, name: true, image: true, carCategory: true},
      where: {riding: false, roleId: 'driver'},
    });
  }

  setRiding(userId: string, riding: boolean) {
    return this.db.update({where: {id: userId}, data: {riding}})
  }
}
