import { NewGenre } from "@/db/schema";
import { config } from "dotenv";
config({ path: ".env" });
const main = async () => {
  const { db } = await import("../db");
  const { genres } = await import("../db/schema/genres");

  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list",
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    },
  );

  const data = await response.json();

  const genresToAdd: NewGenre[] = data?.genres?.map(
    (g: { id: number; name: string }) => ({
      tmdbId: g.id,
      name: g.name,
    }),
  );
  await db.insert(genres).values(genresToAdd).onConflictDoNothing();

  console.log(`seed ${data?.genres?.length} into DB`);
  process.exit(0);
};

main();
