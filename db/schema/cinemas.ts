import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { Hall } from "./halls";

export const cinemas = pgTable("cinemas", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  numberOfHalls: integer("number_of_halls").notNull().default(1),
  city: text("city").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Cinema = typeof cinemas.$inferSelect;
export type NewCinema = typeof cinemas.$inferInsert;
export type CinemaWithHalls = Cinema & { halls: Hall[] };
