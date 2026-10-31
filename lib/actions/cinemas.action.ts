"use server";

import { cinemaAdmins, cinemas, halls, NewHall } from "@/db/schema";
import { cinemaValidationSchema } from "@/validationSchemas";
import { requireAdmin } from "../auth";
import { db } from "@/db";
import { eq, inArray } from "drizzle-orm";

export const createCinema = async (values: {
  name: string;
  city: string;
  address: string;
  numberOfHalls: string;
}) => {
  const admin = await requireAdmin();
  if (!admin) throw new Error("forbidden");

  const data = cinemaValidationSchema.parse(values);
  const { name, numberOfHalls, city, address } = data;

  const parsedNumOfHalls = Number(numberOfHalls);

  return await db.transaction(async (tx) => {
    // create the cinema
    const [cinema] = await tx
      .insert(cinemas)
      .values({
        name,
        numberOfHalls: parsedNumOfHalls,
        city,
        address,
      })
      .returning();

    const insertedCinemaId = cinema.id;

    // insert record into cinema admin pivot table
    await tx.insert(cinemaAdmins).values({
      cinemaId: insertedCinemaId,
      userId: admin.clerkId,
    });

    // create halls based on number of halls entered
    if (parsedNumOfHalls > 0) {
      const hallsToAdd: NewHall[] = Array.from({
        length: parsedNumOfHalls,
      }).map((_, index) => ({
        name: `Hall ${index + 1}`,
        cinemaId: insertedCinemaId,
      }));

      await tx.insert(halls).values(hallsToAdd);
    }

    return cinema;
  });
};

export const listUserCinemas = async () => {
  const admin = await requireAdmin();
  if (!admin) throw new Error("forbidden");

  return await db.transaction(async (tx) => {
    // get the records from the pivot table
    const adminCinemasRecords = await tx.query.cinemaAdmins.findMany({
      where: eq(cinemaAdmins.userId, admin.clerkId),
      columns: { cinemaId: true },
    });

    // array of cinema ids from the pivot table
    const adminCinemasIds = adminCinemasRecords.map(
      (record) => record.cinemaId,
    );

    if (!adminCinemasIds.length) return [];

    // get all cinema from cinema table where the is is in the  cinema admins cinema id table
    const cinemasList = await tx.query.cinemas.findMany({
      where: inArray(cinemas.id, adminCinemasIds),
      with: { halls: true },
    });

    return cinemasList;
  });
};
