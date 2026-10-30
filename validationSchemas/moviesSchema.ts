import * as z from "zod";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

export const moviesValidationSchema = z.object({
  title: z
    .string()
    .min(2, { error: "Title Must be 2 charchaters minmum" })
    .max(100, { error: "Title Must be 100 charchaters Maximum" }),
  directorName: z.union([
    z
      .string()
      .min(2, { error: "Director Name Must be 2 charchaters minmum" })
      .max(100, { error: "Director Name Must be 100 charchaters Maximum" })
      .nullable(),
    z.literal(""),
  ]),
  description: z
    .string()
    .min(2, { error: "Discription Must be 2 charchaters minmum" })
    .max(500, { error: "Discription Must be 500 charchaters minmum" })
    .nullable(),

  cast: z.array(z.string()),
  genres: z.array(z.string()),
  durationMin: z
    .string({ error: "Required" })
    .nonempty({ error: "Please Enter Duration" })
    .regex(/^\d+$/, "Must contain only digits"),

  poster: z
    .custom<File | null | undefined>(
      (v) => !v || v instanceof File,
      "Invalid file",
    )
    .refine((f) => !f || f.size <= MAX_SIZE, "Max size is 10MB")
    .refine(
      (f) => !f || ACCEPTED_TYPES.includes(f.type),
      "Only JPG, PNG allowed",
    )
    .nullish(),

  trailerUrl: z.string().nullable(),
});
