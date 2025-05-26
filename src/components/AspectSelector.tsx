import { MultiSelect } from "@mantine/core";

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
  return (
    <MultiSelect
      label="Aspects to Analyze"
      placeholder="Select aspects or leave empty for general sentiment analysis"
      description="Choose specific aspects to analyze or leave empty to use general sentiment analysis"
      data={DEFAULT_ASPECTS}
      value={value}
      onChange={onChange}
      searchable
      creatable
      getCreateLabel={(query) => `+ Add ${query}`}
      disabled={disabled}
    />
  );
}
