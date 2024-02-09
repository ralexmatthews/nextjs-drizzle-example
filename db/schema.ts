import {
  boolean,
  timestamp,
  int,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const tasks = mysqlTable("tasks", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 256 }).notNull(),
  completed: boolean("completed").notNull().default(false),
  assignedUserId: int("assigned_user_id").references(() => users.id),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
