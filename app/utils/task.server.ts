/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Priority, Status } from "@prisma/client";
import {prisma} from "~/database.server"
import { findUserByAuth0Id } from "./users.server"


export async function createTask({title, status, priority, auth0Id}: {title: string, status: Status, priority: Priority, auth0Id: string}) {
  const userExists =  await findUserByAuth0Id(auth0Id);
  if(!userExists) {
    throw new Error("User does not exist")
  }

  const task = await prisma.task.create({
    data: {
      title, 
      status,
      priority,
      auth0Id,
    }
  })

  return task;
}



export async function deleteTask(id: number, auth0Id: string) {
  const user = findUserByAuth0Id(auth0Id);
  if(!user) {
    throw new Error("User does not exist")
  }

  await prisma.task.delete({
    where: {
      id
    }
  })
  return true;
}
