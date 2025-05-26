import { useState, useRef } from "react";
import {
  Textarea,
  Button,
  Stack,
  Card,
  Group,
  Text,
  Alert,
  Loader,
  FileButton,
} from "@mantine/core";
import { IconAlertCircle, IconUpload } from "@tabler/icons-react";
import { useReviewAnalysis } from "../hooks/useReviews";
import { AspectSelector } from "./AspectSelector";

import type { ReviewAnalysisResponse } from "../services/api";

interface ReviewJSONProps {
  onAnalysisComplete: (result: ReviewAnalysisResponse) => void;
}

export function ReviewJSON({ onAnalysisComplete }: ReviewJSONProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [aspects, setAspects] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const resetRef = useRef<() => void>(null);
  const {
    mutate: analyzeReviews,
    isPending: isAnalysisPending,
    error: analysisError,
  } = useReviewAnalysis({
    onSuccess: (data) => {
      onAnalysisComplete(data);
    },
  });

  const handleFileUpload = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const json = JSON.parse(content);

        if (json.reviews && Array.isArray(json.reviews)) {
          setJsonInput(JSON.stringify(json.reviews, null, 2));
        } else {
          if (Array.isArray(json)) {
            setJsonInput(JSON.stringify(json, null, 2));
          } else {
            throw new Error(
              "JSON must contain a 'reviews' array or be an array of reviews"
            );
          }
        }
      } catch (err) {
        console.error("Error parsing JSON file:", err);
        setFileName(null);
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonInput) return;

    try {
      const reviews = JSON.parse(jsonInput);
      if (!Array.isArray(reviews)) {
        throw new Error("JSON must contain an array of reviews");
      }

      analyzeReviews({
        reviews,
        aspects: aspects.length > 0 ? aspects : undefined,
      });
    } catch (err) {
      console.error("Error parsing JSON input:", err);
      throw new Error(
        `Failed to parse JSON: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <Stack spacing="xl">
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <Textarea
            required
            label="JSON Reviews"
            placeholder="Paste JSON array of reviews or upload a .json file..."
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            minRows={10}
            maxRows={10}
            styles={{ input: { resize: "none" } }}
            disabled={isAnalysisPending}
          />

          <AspectSelector
            value={aspects}
            onChange={setAspects}
            disabled={isAnalysisPending}
          />

          <Group position="apart" align="center">
            <Group spacing="sm">
              <FileButton
                resetRef={resetRef}
                accept="application/json"
                onChange={(file) => {
                  setFileName(file?.name || null);
                  handleFileUpload(file);
                }}
              >
                {(props) => (
                  <Button
                    {...props}
                    variant="light"
                    leftIcon={<IconUpload size="1rem" />}
                    disabled={isAnalysisPending}
                    size="lg"
                  >
                    Upload JSON
                  </Button>
                )}
              </FileButton>
              {fileName && (
                <Text size="sm" color="dimmed">
                  {fileName}
                </Text>
              )}
            </Group>

            <Button type="submit" loading={isAnalysisPending} size="lg">
              Analyze
            </Button>
          </Group>
        </Stack>
      </form>

      {analysisError && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          Failed to analyze reviews. Please check your JSON format and try
          again.
        </Alert>
      )}

      {isAnalysisPending && (
        <Card withBorder>
          <Group position="center">
            <Loader />
            <Text>Analyzing reviews...</Text>
          </Group>
        </Card>
      )}
    </Stack>
  );
}
