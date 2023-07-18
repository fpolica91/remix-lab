/* eslint-disable @typescript-eslint/consistent-type-imports */
import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Todo App" },
    { name: "description", content: "Remix Todo App" },
  ];
};

export default function Todos() {
  // Here's a static list of todos
  let todos = ["Buy groceries", "Finish project", "Call mom"];

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100 flex justify-center items-center rounded-lg">
      <div className="bg-white rounded-lg shadow-md p-8  w-3/5">
        <h1 className="text-4xl mb-6 text-center text-gray-800">Todos</h1>
        <ul className="space-y-4">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="p-4 bg-lime-100 rounded-md text-gray-700 text-lg"
            >
              {todo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
