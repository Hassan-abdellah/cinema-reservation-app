import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { cinemas } from "./cinemas";

export const halls = pgTable("halls", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  cinemaId: uuid("cinema_id")
    .notNull()
    .references(() => cinemas.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Hall = typeof halls.$inferSelect;
export type NewHall = typeof halls.$inferInsert;
