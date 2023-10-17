import { Habit } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "./db/prisma";

export const checkResetStreak = (habits: Array<Habit>) => {
  habits.forEach(async (habit) => {
    if (habit.updatedAt) {
      const updatedAt = new Date(habit.updatedAt);
      const today = new Date();
      if (updatedAt.getDay() < today.getDay()) {
        await prisma.habit.update({
          where: { id: habit.id },
          data: {
            updatedAt: null,
            streak: 0,
          },
        });
      }
    }
  });
  revalidatePath("/");
};
