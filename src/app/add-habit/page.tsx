import FormSubmit from "@/components/FormSubmit";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Habit",
};

async function addHabit(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();

  if (!name || !description) {
    throw Error("Missing required fields");
  }

  await prisma.habit.create({
    data: {
      name,
      description,
      streak: 0,
      highestStreak: 0,
      updatedAt: null,
    },
  });
  redirect("/");
}

export default function AddHabit() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Habit</h1>
      <form action={addHabit}>
        <input
          type="text"
          required
          name="name"
          placeholder="Type a Habit"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Type a description"
          className="textarea-bordered textarea mb-3 w-full"
        ></textarea>
        <FormSubmit className="btn-block">Add</FormSubmit>
      </form>
    </div>
  );
}
