import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  directorName: text("director_name"),
  description: text("description"),
  cast: text("cast")
    .array()
    .default(sql`ARRAY[]::text[]`),
  posterUrl: text("poster_url"),
  durationMin: integer("duration_minutes").notNull(),
  trailerUrl: text("trailer_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Movie = typeof movies.$inferSelect;
export type NewMovie = typeof movies.$inferInsert;
