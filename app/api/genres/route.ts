import { db } from "@/db";
import { requireSuperAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const superAdmin = await requireSuperAdmin();

  if (!superAdmin)
    return NextResponse.json({ status: 403, message: "Forbidden" });

  const genres = await db.query.genres.findMany();
  return NextResponse.json({ status: 200, genres: genres });
};
