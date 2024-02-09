import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: "127.0.0.1",
    user: "root",
    password: "goober",
    port: 3306,
    database: "task_manager",
  },
} satisfies Config;
