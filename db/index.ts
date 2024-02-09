import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import connectionConfig from "./connection";
import * as schema from "./schema";

const poolConnection = mysql.createPool(connectionConfig);

export const db = drizzle(poolConnection, { schema, mode: "default" });
