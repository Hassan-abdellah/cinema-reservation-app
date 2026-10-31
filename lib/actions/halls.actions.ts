import { db } from "@/db";
import { requireAdmin } from "../auth";
import { eq } from "drizzle-orm";
import { halls } from "@/db/schema";

export const viewHall = async (hallId: string) => {
  const admin = requireAdmin();

  if (!admin) throw new Error("forbidden");

  return await db.query.halls.findFirst({
    where: eq(halls.id, hallId),
    with: { cinema: { columns: { id: true, name: true } } },
  });
};
