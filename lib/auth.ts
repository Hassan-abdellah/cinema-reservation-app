import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cache } from "react";

// logged in user
export const getLoggedInUser = cache(async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (existingUser) return existingUser ?? null;
});

// admin
// for server actions
export const requireAdmin = async () => {
  const authUser = await getLoggedInUser();

  if (!authUser || authUser.role !== "admin") {
    throw new Error("Forbidden");
  }

  return authUser;
};

// super admin
// for server actions
export const requireSuperAdmin = async () => {
  const authUser = await getLoggedInUser();

  if (!authUser || authUser.role !== "super-admin") {
    throw new Error("Forbidden");
  }

  return authUser;
};

// admin
// for UI
export const isAdmin = async () => {
  const authUser = await getLoggedInUser();
  if (!authUser || authUser.role !== "admin") redirect("/after-login");

  return authUser;
};

// super admin
// for ui
export const isSuperAdmin = async () => {
  const authUser = await getLoggedInUser();
  if (!authUser || authUser.role !== "super-admin") redirect("/after-login");
  return authUser;
};
