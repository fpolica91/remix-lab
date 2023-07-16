/* eslint-disable @typescript-eslint/no-unused-vars */
import { json } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { auth, getSession } from "~/utils/auth.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Todo App" },
    { name: "description", content: "Remix Todo App" },
  ];
};

type LoaderError = { message: string } | null;
export const loader = async ({ request }: LoaderArgs) => {
  // await auth.isAuthenticated(request);
  // const session = await getSession(request.headers.get("Cookie"));

  // const error = session.get(auth.sessionErrorKey) as LoaderError;
  // return json({ error });
  return json({ error: null });
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-full max-w-xs sm:max-w-xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg transform -skew-y-3 -rotate-3 rounded-3xl sm:-skew-y-0 sm:-rotate-6"></div>
        <div className="relative px-2 py-6 bg-white shadow-lg rounded-3xl p-4 sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <img
                src="https://logo.clearbit.com/todoist.com"
                className="h-7 sm:h-8"
              />
            </div>
            <div className="divide-y divide-gray-200">
              <form className="mt-8" action="/auth0" method="post">
                <div className="mt-6">
                  <button className="mt-6 bg-gradient-to-r from-teal-500 to-cyan-600 p-4 text-white font-semibold rounded-lg">
                    Log In / Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
