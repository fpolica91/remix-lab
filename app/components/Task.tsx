import { Form } from "@remix-run/react";
import type { TaskProps } from "../@types/task.interface";

export function Task({ task }: { task: TaskProps }) {
  return (
    <li
      key={task.id}
      className="flex justify-between items-center p-4 bg-white border-2 border-gray-200 rounded-md text-gray-700 text-lg"
    >
      <div className="font-semibold">{task.title}</div>
      <div className="flex items-center space-x-4">
        <div
          className={`text-sm font-semibold rounded-md px-2 py-1 ${
            task.status === "DONE"
              ? "bg-green-400 text-white"
              : "bg-yellow-400 text-black"
          }`}
        >
          {task.status}
        </div>
        <div
          className={`text-sm font-semibold rounded-md px-2 py-1 ${
            task.priority === "URGENT"
              ? "bg-red-400 text-white"
              : task.priority === "HIGH"
              ? "bg-yellow-400 text-black"
              : "bg-green-400 text-white"
          }`}
        >
          {task.priority}
        </div>
        <Form method="DELETE">
          <input type="hidden" name="id" value={task.id} />
          <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-md">
            Delete
          </button>
        </Form>
      </div>
    </li>
  );
}
