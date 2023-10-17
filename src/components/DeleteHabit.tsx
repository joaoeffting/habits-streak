"use client";

import { Habit } from "@prisma/client";
import { useTransition } from "react";
import DeleteIcon from "./Icons/DeleteIcon";

interface DeleteHabitProps {
  deleteHabit: (habitId: string) => Promise<void>;
  habitId: string;
}

export default function DeleteHabit({
  deleteHabit,
  habitId,
}: DeleteHabitProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-end justify-end">
      <button
        className="px-2"
        disabled={isPending}
        onClick={() => {
          startTransition(() => deleteHabit(habitId));
        }}
      >
        {!isPending && <DeleteIcon />}
        {isPending && <span className="loading loading-spinner loading-md" />}
      </button>
    </div>
  );
}
