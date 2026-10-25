import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { cinemas } from "./cinemas";

export type HallLayout = {
  aisleCols: number[]; // whole columns with no seats
  aisleRows: number[]; // whole rows with no seats
  emptyCells: [number, number][]; // single missing seats / stairs: [x, y]
};

export const halls = pgTable(
  "halls",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    cinemaId: uuid("cinema_id")
      .notNull()
      .references(() => cinemas.id, { onDelete: "cascade" }),

    gridCols: integer("grid_cols"),
    gridRows: integer("grid_rows"),
    layout: jsonb("layout").$type<HallLayout>(),
    isConfigured: boolean("is_configured").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [unique().on(table.cinemaId, table.name)], // prevent duplication for the same hall name on the same cinema
);

export type Hall = typeof halls.$inferSelect;
export type NewHall = typeof halls.$inferInsert;
