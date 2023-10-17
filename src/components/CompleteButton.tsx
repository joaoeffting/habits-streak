"use client";

import { Habit } from "@prisma/client";
import { useState, useTransition } from "react";
import CompleteIcon from "./Icons/CompleteIcon";

interface CompleteButtonProps {
  completeHabit: (habit: Habit) => Promise<void>;
  habit: Habit;
}

export default function CompleteButton({
  completeHabit,
  habit,
}: CompleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-end justify-end">
      <button
        className="px-2"
        disabled={isPending}
        onClick={() => {
          startTransition(() => completeHabit(habit));
        }}
      >
        {!isPending && <CompleteIcon />}
        {isPending && <span className="loading loading-spinner loading-md" />}
      </button>
    </div>
  );
}
