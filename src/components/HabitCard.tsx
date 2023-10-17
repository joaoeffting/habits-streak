import { Habit } from "@prisma/client";
import CompleteButton from "./CompleteButton";
import { completeHabit, deleteHabit } from "./actions";
import DeleteHabit from "./DeleteHabit";

interface HabitCardProps {
  habit: Habit;
}

export default function HabitCard({ habit }: HabitCardProps) {
  let isCompletedToday = false;
  if (habit.updatedAt) {
    const today = new Date();
    const updatedDate = new Date(habit.updatedAt);
    isCompletedToday = today.getDay() === updatedDate.getDay();
  }

  return (
    <div
      className={`card flex w-full flex-row bg-base-100 transition-shadow hover:shadow-xl ${
        isCompletedToday && "bg-success"
      }`}
    >
      <div className="card-body">
        <h2 className="card-title">{habit.name}</h2>
        <p className="">{habit.description}</p>
        <span className="badge badge-secondary font-bold">{`Current Streak ${habit.streak}`}</span>
        <span className="badge badge-primary font-bold">{`Highest Streak ${habit.highestStreak}`}</span>
      </div>
      <div className="flex flex-col gap-4 pt-1">
        <DeleteHabit deleteHabit={deleteHabit} habitId={habit.id} />
        {!isCompletedToday && (
          <CompleteButton completeHabit={completeHabit} habit={habit} />
        )}
      </div>
    </div>
  );
}
