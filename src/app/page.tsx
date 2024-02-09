import { db } from "@/db";
import { users as usersTable, tasks as tasksTable } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import MarkAsCompleteButton from "@/components/mark_as_complete_button";
import { revalidatePath } from "next/cache";
import Table from "@/components/table";

export default async function Home() {
  const users = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      assignedTasks: count(tasksTable.assignedUserId),
    })
    .from(usersTable)
    .leftJoin(tasksTable, eq(usersTable.id, tasksTable.assignedUserId))
    .groupBy(usersTable.id);

  const tasks = await db
    .select()
    .from(tasksTable)
    .leftJoin(usersTable, eq(tasksTable.assignedUserId, usersTable.id));

  const setTaskComplete = async (taskId: number, complete: boolean) => {
    "use server";

    await db
      .update(tasksTable)
      .set({ completed: complete })
      .where(eq(tasksTable.id, taskId));

    revalidatePath("/", "layout");
  };

  return (
    <main className="max-w-prose mx-auto space-y-8">
      <h1 className="text-xl text-primary">Overview</h1>
      <div className="divider" />

      <div className="space-y-4">
        <h2 className="text-primary">Tasks</h2>
        <Table>
          <thead>
            <tr className="bg-neutral text-neutral-content">
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
                <td>{row.users?.name ?? "Unassigned"}</td>
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
        </Table>
      </div>
      <div className="divider" />
      <div className="space-y-4">
        <h2 className="text-primary">Users</h2>
        <Table>
          <thead>
            <tr className="bg-neutral text-neutral-content">
              <th>Id</th>
              <th>Name</th>
              <th>Number Of Assigned Tasks</th>
            </tr>
          </thead>
          <tbody>
            {users.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.assignedTasks}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
}
