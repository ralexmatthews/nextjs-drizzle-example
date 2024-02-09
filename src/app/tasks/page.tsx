import { revalidatePath } from "next/cache";
import UserForm from "./task_form";
import CheckIcon from "@/components/check_icon";
import XIcon from "@/components/x_icon";
import UserSelector from "./user_selector";

const TasksPage = () => {
  const tasks: {
    id: number;
    title: string;
    completed: boolean;
    assignedUser: number | null;
  }[] = [
    { id: 0, title: "Research ORM", completed: false, assignedUser: null },
  ];

  const saveTask = async (name: string) => {
    "use server";
    return new Promise<void>((res) => {
      setTimeout(() => {
        revalidatePath("/tasks");
        res();
      }, 2000);
    });
  };

  return (
    <main className="max-w-prose mx-auto space-y-8">
      <h2 className="text-xl text-primary">Tasks</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Assigned User</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td className={task.completed ? "text-green-500" : ""}>
                {task.completed ? <CheckIcon /> : <XIcon />}
              </td>
              <td>
                <UserSelector
                  user={task.assignedUser}
                  setUser={async () => {
                    "use server";
                  }}
                  users={[
                    { id: 0, name: "Alex" },
                    { id: 1, name: "Darby" },
                  ]}
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
