/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import type {
  V2_MetaFunction,
  LoaderArgs,
  ActionFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { AppUser } from "~/@types/user.interface";
import { findUserByAuth0Id } from "~/utils/users.server";
import { auth } from "~/utils/auth.server";
import { AddTaskModal } from "~/components/AddTask";
import { createTask, deleteTask } from "~/utils/task.server";
import type { Priority, Status } from "@prisma/client";
import { Task } from "~/components/Task";
export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Todo App" },
    { name: "description", content: "Remix Todo App" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });

  if (!profile?._json?.sub) {
    return json({ task: null });
  }

  if (request.method === "DELETE") {
    const body = await request.formData();
    const id = Number(body.get("id"));
    await deleteTask(id, profile._json.sub);
    return json({ task: null });
  }
  const body = await request.formData();
  const title = body.get("title") as string;
  const status = body.get("status") as Status;
  const priority = body.get("priority") as Priority;

  let task;
  if (title && status && priority) {
    task = await createTask({
      title,
      status,
      priority,
      auth0Id: profile._json.sub,
    });
  }

  return json({ task });
};

export const loader = async ({ request }: LoaderArgs) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });

  if (!profile?._json?.sub) {
    return json({ user: null });
  }
  const user = await findUserByAuth0Id(profile._json.sub);

  return json({
    user,
  });
};

export default function Todos() {
  const { user } = useLoaderData<typeof loader>() as unknown as AppUser;
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100 flex justify-center items-center rounded-lg">
      <div className="bg-white rounded-lg shadow-md p-8  w-3/5">
        <h1 className="text-4xl mb-6 text-center text-gray-800">Todos</h1>
        <button
          onClick={handleOpenModal}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
        <AddTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <ul className="space-y-4">
          {user?.Task?.map((task) => (
            // eslint-disable-next-line react/jsx-key
            <Task task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
}
