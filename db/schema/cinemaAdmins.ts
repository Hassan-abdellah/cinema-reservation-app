import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { cinemas } from "./cinemas";

export const cinemaRoles = pgEnum("cinema_roles", [
  "manager",
  "owner",
  "staff",
]);

export const cinemaAdmins = pgTable(
  "cinema_admins",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.clerkId, { onDelete: "cascade" }),
    cinemaId: uuid("cinema_id")
      .notNull()
      .references(() => cinemas.id, { onDelete: "cascade" }),

    role: cinemaRoles("role").default("manager").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.cinemaId] })],
);
