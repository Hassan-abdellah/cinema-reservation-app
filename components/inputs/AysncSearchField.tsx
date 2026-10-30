import { useEffect, useState, Fragment } from "react";

import useDebounce from "@/hooks/useDebounce";
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
} from "../ui/combobox";
import { Spinner } from "../ui/spinner";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { SelectOptionType } from "@/types";

interface AsycnSearchProps {
  id: string;
  label: string;
  value: string[];
  handleChange: (value: string[]) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  error: string | undefined;
  fetchUrl: string;
  cacheKey: string;
  mappingKey: string;
  mappingValue: string;
  apiKey: string;
  multiple?: boolean;
}
const AysncSearchField = ({
  id,
  label,
  value,
  handleChange,
  onBlur,
  invalid,
  error,
  fetchUrl,
  cacheKey,
  mappingKey,
  mappingValue,
  apiKey,
  multiple,
}: AsycnSearchProps) => {
  const anchor = useComboboxAnchor();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SelectOptionType[]>([]);
  const debouncedQuery = useDebounce(query);

  // fetch skills from API
  const fetchOptions = async (q: string) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const url = new URL(fetchUrl);
      url.searchParams.append("name", q);
      const res = await fetch(url.href);
      if (!res.ok) {
        throw new Error(`Error Happen`);
      }
      const data = await res.json();

      const normalized: SelectOptionType[] = data[apiKey].map(
        (item: Record<string, string>) => ({
          label: item[mappingKey],
          value: String(item[mappingValue]),
        }),
      );
      setResults(normalized ?? []);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  // trigger the API on typing
  useEffect(() => {
    if (!debouncedQuery.trim()) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOptions(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={id} className="input-label">
        {label}
      </FieldLabel>

      <Combobox
        multiple
        autoHighlight
        items={results}
        value={value}
        onValueChange={(values: string[]) =>
          handleChange(multiple ? values : [values[values.length - 1]])
        }
        onInputValueChange={setQuery}
      >
        <ComboboxChips ref={anchor} className="w-full max-w-full input-field">
          <ComboboxValue>
            {(values) => (
              <Fragment>
                {values.map((value: string) => (
                  <ComboboxChip key={value} className="capitalize">
                    {value}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  id={id}
                  placeholder="Search ..."
                  className="w-full"
                  aria-invalid={invalid}
                  onBlur={onBlur}
                />
              </Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxContent anchor={anchor}>
          {results.length === 0 && !isLoading && hasSearched ? (
            <ComboboxEmpty>No Items found.</ComboboxEmpty>
          ) : null}
          <ComboboxList>
            {isLoading ? (
              <div className="flex items-center justify-center h-20">
                <Spinner />
                <span>Loading...</span>
              </div>
            ) : (
              (option) => (
                <ComboboxItem
                  key={option.key}
                  value={option.value}
                  className="capitalize"
                >
                  {option.label}
                </ComboboxItem>
              )
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {invalid && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
};

export default AysncSearchField;
