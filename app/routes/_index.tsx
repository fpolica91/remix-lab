import type { V2_MetaFunction } from "@remix-run/node";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { prisma } from "~/database.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  console.log(prisma.user);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <p>Welcome to remix</p>
    </div>
  );
}
