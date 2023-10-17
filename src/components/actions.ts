"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { Habit } from "@prisma/client";

export async function completeHabit(habit: Habit) {
  await prisma.habit.update({
    where: {
      id: habit.id,
    },
    data: {
      streak: { increment: 1 },
      highestStreak: { increment: 1 },
    },
  });
  revalidatePath("/");
}

export async function deleteHabit(habitId: string) {
  await prisma.habit.delete({ where: { id: habitId } });
  revalidatePath("/");
}
