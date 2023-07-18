import type { Priority, Status } from "./user.interface";

export type TaskProps = {
  id: number;
  title: string;
  status: Status;
  priority: Priority;
}