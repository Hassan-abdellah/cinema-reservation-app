import {
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { halls } from "./halls";

export const seats = pgTable(
  "seats",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    hallId: uuid("hall_id")
      .notNull()
      .references(() => halls.id, { onDelete: "cascade" }),
    label: text("label").notNull(), //A7 B1

    rowLabel: text("row_label").notNull(), // A B
    rowNumber: integer("row_number").notNull(), // 0 1

    gridX: integer("grid_x").notNull(), // column position on the grid
    gridY: integer("grid_y").notNull(), // row position (0 = closest to screen)

    type: text("type").default("standard").notNull(), // VIP / Standard

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique().on(table.hallId, table.gridX, table.gridY), // constraint
    unique().on(table.hallId, table.label), // no duplicated labels in the same hall
  ],
);

export type Seat = typeof seats.$inferSelect;
export type NewSeat = typeof seats.$inferInsert;
