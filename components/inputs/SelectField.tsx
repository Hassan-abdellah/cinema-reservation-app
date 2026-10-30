"use client";
import React, { Fragment, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Skeleton } from "../ui/skeleton";

interface OptionType {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  invalid?: boolean;
  error?: string;
  value: string | string[];
  handleChange: (value: string[] | string | null) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  fetchUrl: string;
  cacheKey: string;
  mappingKey: string;
  mappingValue: string;
  apiKey: string;
}

const SelectField = ({
  id,
  label,
  error,
  invalid = false,
  value,
  handleChange,
  onBlur,
  multiple = false,
  fetchUrl,
  cacheKey,
  mappingKey,
  mappingValue,
  apiKey,
}: SelectFieldProps) => {
  const anchor = useComboboxAnchor();
  const { data, isLoading, isError } = useQuery({
    queryKey: [cacheKey, fetchUrl],
    queryFn: async () => {
      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error("Failed to fetch options");
      const json = await res.json();
      return json[apiKey];
    },
  });

  const normalizedOptions: OptionType[] = useMemo(
    () =>
      Array.isArray(data)
        ? data.map((item: Record<string, string>) => ({
            label: item[mappingKey],
            value: String(item[mappingValue]),
          }))
        : [],
    [data, mappingKey, mappingValue],
  );

  const labelByValue = useMemo(
    () => new Map(normalizedOptions.map((o) => [o.value, o.label])),
    [normalizedOptions],
  );

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Combobox
        multiple={multiple}
        autoHighlight
        items={normalizedOptions}
        value={value}
        onValueChange={handleChange}
      >
        <ComboboxChips ref={anchor} className="w-full input-field">
          <ComboboxValue>
            {(values: string[] | string | null) => {
              const selected = Array.isArray(values)
                ? values
                : values
                  ? [values]
                  : [];

              return (
                <Fragment>
                  {selected.map((v) => (
                    <ComboboxChip key={v}>
                      {labelByValue.get(v) ?? v}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    id={id}
                    onBlur={onBlur}
                    aria-invalid={invalid}
                    placeholder="Select"
                  />
                </Fragment>
              );
            }}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxContent anchor={anchor}>
          {isLoading ? (
            <Skeleton className="h-20 w-full rounded-md" />
          ) : isError ? (
            <div className="p-2 text-sm text-destructive">
              Failed to load options.
            </div>
          ) : (
            <>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item: OptionType) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </>
          )}
        </ComboboxContent>
      </Combobox>

      {invalid && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
};

export default SelectField;
