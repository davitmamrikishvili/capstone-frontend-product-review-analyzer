import { useState, useRef } from "react";
import {
  Textarea,
  Button,
  Stack,
  Title,
  Card,
  Group,
  Text,
  Alert,
  Loader,
  FileButton,
} from "@mantine/core";
import { IconAlertCircle, IconUpload } from "@tabler/icons-react";
import { useReviewAnalysis } from "../hooks/useReviews";
import { AspectSelector, DEFAULT_ASPECTS } from "./AspectSelector";

export function ReviewCSV() {
  const [csvInput, setCsvInput] = useState("");
  const [aspects, setAspects] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const resetRef = useRef<() => void>(null);
  const {
    mutate: analyzeReviews,
    isPending,
    data,
    error,
  } = useReviewAnalysis();

  const parseCSV = (text: string): string[] => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  const handleFileUpload = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCsvInput(content);
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvInput) return;

    const reviews = parseCSV(csvInput);
    if (reviews.length === 0) return;

    analyzeReviews({
      prompt: reviews.join("\n"),
      aspects: aspects.length > 0 ? aspects : DEFAULT_ASPECTS,
    });
  };

  return (
    <Stack spacing="xl">
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <Textarea
            required
            label="CSV Reviews"
            placeholder="Paste reviews (one per line) or upload a CSV file..."
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            minRows={5}
            autosize
            disabled={isPending}
          />

          <AspectSelector
            value={aspects}
            onChange={setAspects}
            disabled={isPending}
          />

          <Group position="apart" align="center">
            <Group spacing="sm">
              <FileButton
                resetRef={resetRef}
                accept=".csv,text/csv"
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
                    disabled={isPending}
                    size="lg"
                  >
                    Upload CSV
                  </Button>
                )}
              </FileButton>
              {fileName && (
                <Text size="sm" color="dimmed">
                  {fileName}
                </Text>
              )}
            </Group>

            <Button type="submit" loading={isPending} size="lg">
              Analyze
            </Button>
          </Group>
        </Stack>
      </form>

      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          Failed to analyze reviews. Please check your input format and try
          again.
        </Alert>
      )}

      {isPending && (
        <Card withBorder>
          <Group position="center">
            <Loader />
            <Text>Analyzing reviews...</Text>
          </Group>
        </Card>
      )}

      {data && (
        <Card withBorder>
          <Stack spacing="md">
            <Title order={3}>Analysis Results</Title>
            {data.results.map(({ aspect, sentiment }) => (
              <Card key={aspect} withBorder>
                <Group position="apart">
                  <Text weight={500} transform="capitalize">
                    {aspect}
                  </Text>
                  <Text
                    color={sentiment.label === "positive" ? "green" : "red"}
                    weight={500}
                  >
                    {sentiment.label} ({(sentiment.score * 100).toFixed(1)}%)
                  </Text>
                </Group>
              </Card>
            ))}
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
