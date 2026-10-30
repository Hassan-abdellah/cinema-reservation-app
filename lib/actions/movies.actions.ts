"use server";

import { requireSuperAdmin } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/db";
import { movies, moviesGenres } from "@/db/schema";
import { moviesValidationSchema } from "@/validationSchemas";

export const createMovie = async (values: FormData) => {
  const user = await requireSuperAdmin();

  if (!user) throw new Error("forbidden");
  const parsed = Object.fromEntries(values.entries());
  const newValues = {
    ...parsed,
    cast: JSON.parse(parsed?.cast as string),
    genres: JSON.parse(parsed?.genres as string),
  };

  // parse the schema
  const data = moviesValidationSchema.parse(newValues);
  console.log("data", data);

  //   upload the image to cloudinary

  const arrayBuffer = await data.poster.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "cinema-app" },
        (error, result) => {
          console.log("error", error);
          if (error) return reject(error);

          resolve(result);
        },
      )
      .end(buffer);
  });

  const posterUrl = (uploadResult as { secure_url: string })?.secure_url;

  const {
    title,
    description,
    directorName,
    durationMin,
    cast,
    trailerUrl,
    genres,
  } = data;
  return db.transaction(async (tx) => {
    const [movie] = await tx
      .insert(movies)
      .values({
        title,
        description,
        directorName,
        durationMin: Number(durationMin),
        cast,
        trailerUrl,
        posterUrl,
      })
      .returning();

    if (genres.length) {
      const genresMovies: { movieId: string; genreId: number }[] = genres.map(
        (genreId) => ({
          movieId: movie.id,
          genreId: Number(genreId),
        }),
      );
      await tx.insert(moviesGenres).values(genresMovies);
    }

    return movie.id;
  });
};
