import Button from "@/components/ui/Button";
import { db } from "@/lib/db";

export default async function Home() {
  await db.set("world", "world");
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant={"ghost"}>Hello</Button>
    </div>
  );
}
