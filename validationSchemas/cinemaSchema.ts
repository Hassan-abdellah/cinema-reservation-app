import * as z from "zod";

export const cinemaValidationSchema = z.object({
  name: z
    .string({ error: "Cinema Name is Required" })
    .min(2, { error: "Cinema Name Must be 2 charchaters at least" })
    .max(100, { error: "Cinema Name Must be 100 Characters at maximum" }),

  numberOfHalls: z
    .string({ error: "Number of Halls is Required" })
    .nonempty({ error: "Please Enter The Number of Halls" })
    .regex(/^\d+$/, "Must contain only digits")
    .refine((value) => Number(value) > 0, "Must Be At least one"),

  city: z
    .string({ error: "Cinema City is Required" })
    .min(2, { error: "Cinema City Must be 2 charchaters at least" })
    .max(100, { error: "Cinema City Must be 100 Characters at maximum" }),
  address: z
    .string({ error: "Cinema Adress is Required" })
    .min(2, { error: "Cinema Adress Must be 2 charchaters at least" })
    .max(500, { error: "Cinema Adress Must be 500 Characters at maximum" }),
});
