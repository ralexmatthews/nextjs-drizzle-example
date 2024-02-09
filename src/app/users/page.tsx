import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { users as usersTable } from "@/db/schema";
import Table from "@/components/table";
import UserForm from "./user_form";

const UsersPage = async () => {
  const users = await db.query.users.findMany();

  const saveUser = async (name: string) => {
    "use server";

    await db.insert(usersTable).values({ name });

    revalidatePath("/", "layout");
  };

  return (
    <main className="max-w-prose mx-auto space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl text-primary">Users</h2>
        <Table>
          <thead>
            <tr className="bg-neutral text-neutral-content">
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
        </Table>
      </div>
      <div className="divider" />
      <div className="space-y-4">
        <h2 className="text-xl text-primary">Create User</h2>
        <UserForm saveUser={saveUser} />
      </div>
    </main>
  );
};

export default UsersPage;
