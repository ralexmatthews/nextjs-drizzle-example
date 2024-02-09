import { revalidatePath } from "next/cache";
import UserForm from "./task_form";
import CheckIcon from "@/components/check_icon";
import XIcon from "@/components/x_icon";
import { eq } from "drizzle-orm";
import UserSelector from "./user_selector";
import { db } from "../../../db";
import { tasks as tasksTable, users as usersTable } from "../../../db/schema";
import MarkAsCompleteButton from "@/components/mark_as_complete_button";

const TasksPage = async () => {
  const tasks = await db
    .select()
    .from(tasksTable)
    .leftJoin(usersTable, eq(tasksTable.assignedUserId, usersTable.id));

  const users = await db.query.users.findMany({
    columns: { id: true, name: true },
  });

  const saveTask = async (title: string) => {
    "use server";

    await db.insert(tasksTable).values({ title });

    revalidatePath("/tasks");
  };

  const setAssignedUser = async (taskId: number, userId: number | null) => {
    "use server";

    await db
      .update(tasksTable)
      .set({ assignedUserId: userId })
      .where(eq(tasksTable.id, taskId));

    revalidatePath("/tasks");
  };

  const setTaskComplete = async (taskId: number, complete: boolean) => {
    "use server";

    await db
      .update(tasksTable)
      .set({ completed: complete })
      .where(eq(tasksTable.id, taskId));

    revalidatePath("/tasks");
  };

  return (
    <main className="max-w-prose mx-auto space-y-8">
      <h2 className="text-xl text-primary">Tasks</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Assigned User</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((row) => (
            <tr key={row.tasks.id}>
              <td>{row.tasks.id}</td>
              <td>{row.tasks.title}</td>
              <td>
                <UserSelector
                  taskId={row.tasks.id}
                  user={row.users?.id ?? null}
                  setUser={setAssignedUser}
                  users={users}
                />
              </td>
              <td>
                <MarkAsCompleteButton
                  taskId={row.tasks.id}
                  isComplete={row.tasks.completed}
                  toggleComplete={setTaskComplete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserForm saveTask={saveTask} />
    </main>
  );
};

export default TasksPage;
