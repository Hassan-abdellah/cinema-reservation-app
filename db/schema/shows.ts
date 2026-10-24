import { numeric, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { movies } from "./movies";
import { halls } from "./halls";

export const shows = pgTable("shows", {
  id: uuid("id").primaryKey().defaultRandom(),
  movieId: uuid("movie_id")
    .notNull()
    .references(() => movies.id, { onDelete: "no action" }),
  hallId: uuid("hall_id")
    .notNull()
    .references(() => halls.id, { onDelete: "no action" }),
  startsAt: timestamp("starts_at").notNull(),
  price: numeric("price", { precision: 8, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }), // when null => means is active
});

export type Show = typeof shows.$inferSelect;
export type NewShow = typeof shows.$inferInsert;
