import Habits from "@/components/Habits";
import { checkResetStreak } from "@/lib/checkResetStreak";
import { prisma } from "@/lib/db/prisma";
const schedule = require("node-schedule");

export default async function Home() {
  const habits = await prisma.habit.findMany({ orderBy: { id: "desc" } });
  schedule.scheduleJob("*/5 * * * *", function () {
    checkResetStreak(habits);
  });

  return (
    <div>
      <Habits habits={habits} />
    </div>
  );
}
