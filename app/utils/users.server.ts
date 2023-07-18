

import {prisma} from "~/database.server"
import type { Auth0UserInformation } from "../@types/auth0-user.interface";


async function findUserByAuth0Id(auth0Id: string) {
  const user = await prisma.user.findUnique({
    where: {
      auth0Id: auth0Id,
    },
    include: {
      Task: true,
    }
  });
  return user;
}

async function createUser({auth0Id, email, name, picture }: Auth0UserInformation) {
  const user = await prisma.user.create({
    data: {
      auth0Id: auth0Id,
      email: email,
      name: name,
      pictureUrl: picture,
    }
  })

  return user;
}

async function getUser(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}


export {getUser, findUserByAuth0Id, createUser}