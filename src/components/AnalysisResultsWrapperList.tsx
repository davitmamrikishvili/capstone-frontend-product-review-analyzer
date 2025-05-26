import { Stack, Paper } from "@mantine/core";
import { type ReviewAnalysisResponse } from "../services/api";
import { AnalysisResultsWrapper } from "./AnalysisResultsWrapper";

interface AnalysisResultsWrapperListProps {
  results: ReviewAnalysisResponse[];
}

export function AnalysisResultsWrapperList({
  results,
}: AnalysisResultsWrapperListProps) {
  if (results.length === 0) return null;

  return (
    <Stack spacing="xl">
      {results.map((result, index) => (
        <Paper
          key={`${index}-${result.analysis_type}`}
          shadow="xs"
          p="md"
          withBorder
        >
          <AnalysisResultsWrapper
            results={[result]}
            timestamp={new Date(result.timestamp) || new Date()}
            summary={result.summary}
          />
        </Paper>
      ))}
    </Stack>
  );
}
