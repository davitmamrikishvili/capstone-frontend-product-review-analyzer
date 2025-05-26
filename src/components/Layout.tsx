import { useState } from "react";
import { Paper, Stack, Tabs } from "@mantine/core";
import { IconWorld, IconJson } from "@tabler/icons-react";
import { ReviewURL } from "./ReviewURL";
import { ReviewJSON } from "./ReviewJSON";
import { AnalysisResultsWrapperList } from "./AnalysisResultsWrapperList";
import { type ReviewAnalysisResponse } from "../services/api";

export function Layout() {
  const [analysisResults, setAnalysisResults] = useState<
    ReviewAnalysisResponse[]
  >([]);
  const [activeTab, setActiveTab] = useState<string | null>("url");

  const handleAnalysisComplete = (result: ReviewAnalysisResponse) => {
    const resultWithTimestamp = {
      ...result,
      timestamp: new Date().toISOString(),
    };
    setAnalysisResults((prev) => [resultWithTimestamp, ...prev]); // Add new results to the top
  };

  return (
    <Stack spacing="xl">
      <Paper shadow="xs" p="md">
        <Tabs value={activeTab} onTabChange={setActiveTab}>
          <Tabs.List grow mb="md">
            <Tabs.Tab value="url" icon={<IconWorld size="1rem" />}>
              URL
            </Tabs.Tab>
            <Tabs.Tab value="json" icon={<IconJson size="1rem" />}>
              JSON
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="url">
            <ReviewURL onAnalysisComplete={handleAnalysisComplete} />
          </Tabs.Panel>

          <Tabs.Panel value="json">
            <ReviewJSON onAnalysisComplete={handleAnalysisComplete} />
          </Tabs.Panel>
        </Tabs>
      </Paper>

      {analysisResults.length > 0 && (
        <AnalysisResultsWrapperList results={analysisResults} />
      )}
    </Stack>
  );
}
