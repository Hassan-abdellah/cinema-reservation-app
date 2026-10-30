import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
const url = process.env.DATABASE_URL_POOLED;
if (!url) throw new Error("DATABASE_URL_POOLED is not set");

export const db = drizzle({
  client: new Pool({ connectionString: url }),
  schema,
});
