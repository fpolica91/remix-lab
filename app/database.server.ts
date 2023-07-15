/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {PrismaClient} from "@prisma/client"

let prisma: PrismaClient


declare global {
  var __db__: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  prisma = getClient();
} else {
  if (!global.__db__) {
    global.__db__ = getClient();
  }
  prisma = global.__db__;
}



function getClient(){
  const {DATABASE_URL} = process.env
  console.log(DATABASE_URL)
  const databaseUrl = new URL(DATABASE_URL as string);

  const client = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl.toString(),
      },
    },
  });
 
  client.$connect();

  return client

}


export {prisma}