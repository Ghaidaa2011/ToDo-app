import { PrismaClient } from '@prisma/client'
// import { faker } from "@faker-js/faker";

const prisma = new PrismaClient()

async function main() {
  // await prisma.todo.createMany({
  //   data: Array.from({ length: 25 }, () => ({
  //     title: faker.lorem.words({ min: 2, max: 5 }),
  //     body: faker.lorem.words({ min: 1, max: 10 }),
  //     user_id: "user_2mkyDGivIcbfSA7e9iTwMFi6b9V",
  //   }))
  // })
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })