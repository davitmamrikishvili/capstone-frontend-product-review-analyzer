import { MultiSelect } from "@mantine/core";
import { useState } from "react";

export const DEFAULT_ASPECTS = [
  "quality",
  "price",
  "durability",
  "design",
  "performance",
];

interface AspectSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export function AspectSelector({
  value,
  onChange,
  disabled,
}: AspectSelectorProps) {
  const [data, setData] = useState(
    DEFAULT_ASPECTS.map((aspect) => ({ value: aspect, label: aspect }))
  );
  const [search, setSearch] = useState("");

  const createAspect = (query: string) => {
    const normalizedQuery = query.toLowerCase();
    const item = { value: normalizedQuery, label: query };
    setData((current) => [...current, item]);
    onChange([...value, normalizedQuery]);
    setSearch("");
    return item;
  };

  return (
    <MultiSelect
      label="Aspects to Analyze"
      placeholder="Select aspects or leave empty for general sentiment analysis"
      description="Choose specific aspects to analyze or leave empty to use general sentiment analysis"
      data={data}
      value={value}
      onChange={onChange}
      searchable
      creatable
      getCreateLabel={(query) => `+ Add ${query}`}
      onCreate={createAspect}
      onKeyDown={(event) => {
        if (event.key === "Enter" && search) {
          event.preventDefault();
          createAspect(search);
        }
      }}
      disabled={disabled}
      searchValue={search}
      onSearchChange={setSearch}
    />
  );
}
