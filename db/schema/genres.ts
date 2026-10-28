import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const genres = pgTable("genres", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  tmdbId: integer("tmdb_id").unique(),
});

export type Genre = typeof genres.$inferSelect;
export type NewGenre = typeof genres.$inferInsert;
