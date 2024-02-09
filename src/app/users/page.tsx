import { revalidatePath } from "next/cache";
import UserForm from "./user_form";

const UsersPage = () => {
  const users: { id: number; name: string }[] = [{ id: 0, name: "Alex" }];

  const saveUser = async (name: string) => {
    "use server";
    return new Promise<void>((res) => {
      setTimeout(() => {
        revalidatePath("/users");
        res();
      }, 2000);
    });
  };

  return (
    <main className="max-w-prose mx-auto space-y-8">
      <h2 className="text-xl">Users</h2>
      <table className="table border rounded-xl">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserForm saveUser={saveUser} />
    </main>
  );
};

export default UsersPage;
