import CheckIcon from "@/components/check_icon";
import XIcon from "@/components/x_icon";

export default function Home() {
  const tasks: {
    id: number;
    title: string;
    completed: boolean;
    assignedUser: number | null;
  }[] = [{ id: 0, title: "Research ORM", completed: false, assignedUser: 0 }];
  const users: { id: number; name: string; assignedTasks: number }[] = [
    { id: 0, name: "Alex", assignedTasks: 1 },
  ];

  return (
    <main className="max-w-prose mx-auto space-y-8">
      <h1 className="text-xl">Overview</h1>
      <div className="space-y-4">
        <h2>Tasks</h2>
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
                  {users.find((user) => user.id === task.assignedUser)?.name ??
                    "None"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-4">
        <h2>Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Number Of Assigned Tasks</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.assignedTasks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
