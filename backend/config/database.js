import { PrismaClient } from '../generated/prisma/index.js'

let prisma


if (!global.__prisma) {
  global.__prisma = new PrismaClient()
}
prisma = global.__prisma


export { prisma }