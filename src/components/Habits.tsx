import { Habit } from "@prisma/client";
import HabitCard from "./HabitCard";

interface HabitsProps {
  habits: Array<Habit>;
}

export default function Habits({ habits }: HabitsProps) {
  return (
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
