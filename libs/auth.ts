import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cache } from "react";

// logged in user
export const getLoggedInUser = cache(async () => {
  console.log("called");
  const { userId } = await auth();

  if (!userId) return null;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (existingUser) return existingUser;
});

// admin
export const requireAdmin = async () => {
  const authUser = await getLoggedInUser();

  if (!authUser || authUser.role !== "admin") {
    throw new Error("Forbidden");
  }

  return authUser;
};

// super admin
export const requireSuperAdmin = async () => {
  const authUser = await getLoggedInUser();

  if (!authUser || authUser.role !== "super-admin") {
    throw new Error("Forbidden");
  }

  return authUser;
};
