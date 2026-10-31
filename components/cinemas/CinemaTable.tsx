"use client";

import { CinemaWithHalls } from "@/db/schema";
import { DataTable } from "../tables/DataTable";

import { createColumnHelper } from "@tanstack/react-table";
import { DataTableFeatures } from "../tables/TableFeatures";
import Link from "next/link";
import { Button } from "../ui/button";
import { clsx } from "cn";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, CinemaWithHalls>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("city", {
    header: "City",
  }),
  columnHelper.accessor("address", {
    header: "Address",
  }),
  columnHelper.display({
    header: "Halls",
    cell: ({ row }) => {
      const cinemaHalls = row.original.halls;
      return (
        <ul className="flex items-center gap-1">
          {cinemaHalls.map((hall) => (
            <li key={hall.id}>
              <Link
                href={`halls/${hall.id}`}
                className="bg-steel-azure rounded-lg text-white px-2 py-1 underline"
              >
                {hall.name}
              </Link>
            </li>
          ))}
        </ul>
      );
    },
  }),
  columnHelper.display({
    header: "Status",
    cell: ({ row }) => {
      const cinemaHalls = row.original.halls;
      const hasNonConfigured =
        cinemaHalls.length && cinemaHalls.some((hall) => !hall.isConfigured);

      return (
        <span
          className={clsx(
            "rounded-full px-2 py-1 text-white",
            hasNonConfigured ? "bg-red-400" : "bg-green-400",
          )}
        >
          {hasNonConfigured ? "Non-Configured" : "Configured"}
        </span>
      );
    },
  }),
  columnHelper.display({
    header: "Actions",
    cell: ({ row }) => {
      const ciname = row.original;
      return (
        <Button className="bg-destructive text-white cursor-pointer">
          Delete
        </Button>
      );
    },
  }),
]);

const CinemaTable = ({ cinemas }: { cinemas: CinemaWithHalls[] }) => {
  return <DataTable data={cinemas} columns={columns} />;
};

export default CinemaTable;
