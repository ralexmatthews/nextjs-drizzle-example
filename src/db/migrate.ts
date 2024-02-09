import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import connectionConfig from "./connection";

const runMigration = async () => {
  const clientConnection = await mysql.createConnection(connectionConfig);
  const db = drizzle(clientConnection);

  await migrate(db, { migrationsFolder: "./drizzle" });

  await clientConnection.end();
};

runMigration();
