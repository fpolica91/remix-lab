import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { AppUser } from "~/@types/user.interface";
import { findUserByAuth0Id } from "~/users.server";
import { auth } from "~/utils/auth.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Todo App" },
    { name: "description", content: "Remix Todo App" },
  ];
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

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100 flex justify-center items-center rounded-lg">
      <div className="bg-white rounded-lg shadow-md p-8  w-3/5">
        <h1 className="text-4xl mb-6 text-center text-gray-800">Todos</h1>
        <ul className="space-y-4">
          {user?.Task?.map((task) => (
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
