import { integer, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { movies } from "./movies";
import { genres } from "./genres";

export const moviesGenres = pgTable(
  "movies_generes",
  {
    movieId: uuid("movie_id")
      .notNull()
      .references(() => movies.id, { onDelete: "cascade" }),
    genreId: integer("genre_id")
      .notNull()
      .references(() => genres.id),
  },
  (table) => [primaryKey({ columns: [table.movieId, table.genreId] })],
);
