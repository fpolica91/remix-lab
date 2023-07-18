import type { User } from "@prisma/client";

type Status = "PENDING"
  | "TODO"
  | "DONE"
  | "DELETED"

type Priority =
  "LOW"
 | "MEDIUM"
 | "HIGH"
 | "URGENT"


export type AppUser  =  {
  user: User & {
    Task?: {
    id: number;
    title: string;
    status: Status;
    priority: Priority;
  }[]
  };

}