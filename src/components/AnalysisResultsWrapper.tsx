import { Box, Paper, Stack, Title, Group, ActionIcon } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import { type ReviewAnalysisResponse } from "../services/api";
import { AnalysisResult } from "./AnalysisResult";
import { SummaryResult } from "./SummaryResult";

interface AnalysisResultsWrapperProps {
  results: ReviewAnalysisResponse[];
  timestamp: Date;
  summary?: string;
}

export function AnalysisResultsWrapper({
  results,
  timestamp,
  summary,
}: AnalysisResultsWrapperProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (results.length === 0) return null;

  return (
    <Stack spacing="md">
      <Group position="apart">
        <Title order={3}>{timestamp.toLocaleString()} - Analysis Results</Title>
        <ActionIcon
          onClick={() => setIsExpanded(!isExpanded)}
          size="lg"
          variant="light"
          color="blue"
        >
          {isExpanded ? (
            <IconChevronUp size="1.2rem" />
          ) : (
            <IconChevronDown size="1.2rem" />
          )}
        </ActionIcon>
      </Group>

      {summary && <SummaryResult summary={summary} />}

      {isExpanded && (
        <Box
          sx={{
            minHeight: "20vh",
            maxHeight: "80vh",
            height: "60vh",
            overflowY: "auto",
            transition: "height 0.2s ease",
          }}
        >
          {results.map((analysisResult, index) => (
            <Paper
              key={`${index}-${analysisResult.analysis_type}`}
              shadow="xs"
              p="md"
              withBorder
              mb="md"
            >
              <Stack spacing="md">
                {analysisResult.results.map((result, resultIndex) => (
                  <AnalysisResult key={resultIndex} result={result} />
                ))}
              </Stack>
            </Paper>
          ))}
        </Box>
      )}
    </Stack>
  );
}
