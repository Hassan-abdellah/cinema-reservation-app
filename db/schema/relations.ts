import { relations } from "drizzle-orm";
import { halls } from "./halls";
import { cinemas } from "./cinemas";
import { seats } from "./seats";
import { shows } from "./shows";

export const cinemaRelations = relations(cinemas, ({ many }) => ({
  halls: many(halls),
}));
export const hallsRelations = relations(halls, ({ one, many }) => ({
  cinema: one(cinemas, { fields: [halls.cinemaId], references: [cinemas.id] }),
  seats: many(seats),
  shows: many(shows),
}));
