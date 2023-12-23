//@ts-nocheck
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const initialRoles = [
  {
    "id": "driver",
    "name": "Driver"
  },
  {
    "id": "rider",
    "name": "Rider"
  }
]

const initialCategories = [
  {
    "id": "1",
    "name": "Standard",
    "multiplier": 1
  },
  {
    "id": "2",
    "name": "Black",
    "multiplier": 1.5
  }
]
const initialUsers = [
  {
    "name": "Rider 1",
    "email": "rider1@trashlab.com",
    "emailVerified": null,
    "image": "https://doodleipsum.com/200?i=284470c11c380507f1085e2fde32d467",
    "roleId": "rider",
    "licensePlate": null,
    "riding": false,
    "carCategoryId": null
  },
  {
    "name": "Driver 1",
    "email": "driver1@trashlab.com",
    "emailVerified": null,
    "image": "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/75/759edc71afeb690e8daa09cd6eca4abc2b5e072d.jpg",
    "roleId": "driver",
    "licensePlate": null,
    "riding": false,
    "carCategoryId": "1"
  },
  {
    "name": "Rider 2",
    "email": "rider2@trashlab.com",
    "emailVerified": null,
    "image": "https://doodleipsum.com/200?bg=D98D63&i=dab01ae5ab7024496e2d41549bb33467",
    "roleId": "rider",
    "licensePlate": null,
    "riding": false,
    "carCategoryId": null
  },
  {
    "name": "Driver 2",
    "email": "driver2@trashlab.com",
    "emailVerified": null,
    "image": "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/57/5772ec7ffc6958a2f45e08567178dd1b9351329e.jpg",
    "roleId": "driver",
    "licensePlate": null,
    "riding": false,
    "carCategoryId": "2"
  },
  {
    "name": "Rider 3",
    "email": "rider3@trashlab.com",
    "emailVerified": null,
    "image": "https://doodleipsum.com/200?bg=D98D63&i=6655a263fb3c8a2b96ddab367979846e",
    "roleId": "rider",
    "licensePlate": null,
    "riding": false,
    "carCategoryId": null
  },
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
async function main() {
  await prisma.userRole.create({data: {id: "driver", name: "Driver"}})
  await prisma.userRole.create({data: {id: "rider", name: "Rider"}})

  await delay(500)
  await prisma.carCategory.create({data: {id: "1", name: "Standard", multiplier: 1}})
  await prisma.carCategory.create({data: {id: "2", name: "Black", multiplier: 1.5}})

  await delay(1000)
  void initialUsers.map(async (user) => {
    await prisma.user.create({
      data: user
    })
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
