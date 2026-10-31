export interface castPerson {
  id: number;
  name: string;
  known_for_department: string;
}

export interface SelectOptionType {
  value: string;
  label: string;
}

// types
export type ColumnConfig = {
  key: string; // property on the row, e.g. "name"
  label: string; // header text
  type?: "text" | "number" | "date" | "badge";
  sortable?: boolean;
  hidden?: boolean;
  order?: number;
};
