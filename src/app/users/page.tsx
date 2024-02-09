import { revalidatePath } from "next/cache";
import UserForm from "./user_form";
import { db } from "../../../db";
import { users as usersTable } from "../../../db/schema";

const UsersPage = async () => {
  const users = await db.query.users.findMany();

  const saveUser = async (name: string) => {
    "use server";

    await db.insert(usersTable).values({ name });

    revalidatePath("/users");
  };

  return (
    <main className="max-w-prose mx-auto space-y-8">
      <h2 className="text-xl text-primary">Users</h2>
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
