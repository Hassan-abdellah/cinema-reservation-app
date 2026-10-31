// buildColumns.tsx
import type { ColumnDef, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "./TableFeatures";
import type { ColumnConfig } from "@/types";

const renderers: Record<
  NonNullable<ColumnConfig["type"]>,
  (value: unknown) => React.ReactNode
> = {
  text: (v) => String(v ?? ""),
  number: (v) => Number(v).toLocaleString(),
  date: (v) => (v ? new Date(v as string).toLocaleDateString() : ""),
  badge: (v) => <span className="badge">{String(v)}</span>,
};

export function buildColumns<TData extends RowData>(
  configs: ColumnConfig[],
): ColumnDef<DataTableFeatures, TData>[] {
  return configs
    .filter((c) => !c.hidden)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((c) => ({
      id: c.key,
      accessorFn: (row: TData) => (row as Record<string, unknown>)[c.key],
      header: c.label,
      enableSorting: c.sortable ?? true,
      cell: (info) => renderers[c.type ?? "text"](info.getValue()),
    }));
}
