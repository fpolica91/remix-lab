import type { User } from "@prisma/client";

export type Status = "PENDING"
  | "TODO"
  | "DONE"
  | "DELETED"

export type Priority =
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