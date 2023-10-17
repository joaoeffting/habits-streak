import Habits from "@/components/Habits";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";

export default async function Home() {
  const habits = await prisma.habit.findMany({ orderBy: { id: "desc" } });
  return (
    <div>
      <Habits habits={habits} />
    </div>
  );
}
