import { requireSuperAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { castPerson } from "@/types";

const filterCast = (
  results: castPerson[],
  is_director = false,
): castPerson[] => {
  const filtered = results?.filter((person) =>
    is_director
      ? person.known_for_department === "Directing"
      : person.known_for_department === "Acting",
  );

  return filtered.map((person) => ({
    id: person.id,
    name: person?.name,
    known_for_department: person.known_for_department,
  }));
};
export const GET = async (req: NextRequest) => {
  const superAdmin = await requireSuperAdmin();

  if (!superAdmin)
    return NextResponse.json({ status: 403, message: "Forbidden" });

  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name");
  const isDirector = searchParams.get("is_director") ?? false;

  if (!name)
    return NextResponse.json({
      status: 400,
      message: "Please Provider a Name",
    });
  const response = await fetch(
    `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(name.trim())}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    },
  );

  const data = await response.json();

  const dataResults: castPerson[] = data?.results;
  const results: castPerson[] = isDirector
    ? filterCast(dataResults, true)
    : filterCast(dataResults);

  return NextResponse.json({ status: 200, results });
};
