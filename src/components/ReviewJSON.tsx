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

export function ReviewJSON() {
  const [jsonInput, setJsonInput] = useState("");
  const [aspects, setAspects] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const resetRef = useRef<() => void>(null);
  const {
    mutate: analyzeReviews,
    isPending,
    data,
    error,
  } = useReviewAnalysis();

  const handleFileUpload = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const json = JSON.parse(content);
        // Assuming the JSON contains an array of reviews
        if (Array.isArray(json)) {
          setJsonInput(JSON.stringify(json, null, 2));
        } else {
          throw new Error("JSON must contain an array of reviews");
        }
      } catch (err) {
        console.error("Error parsing JSON file:", err);
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
        prompt: reviews.join("\n"),
        aspects: aspects.length > 0 ? aspects : DEFAULT_ASPECTS,
      });
    } catch (err) {
      console.error("Error parsing JSON input:", err);
    }
  };

  return (
    <Stack spacing="xl">
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <Textarea
            required
            label="JSON Reviews"
            placeholder="Paste JSON array of reviews or upload a file..."
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
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
                    disabled={isPending}
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

            <Button type="submit" loading={isPending} size="lg">
              Analyze
            </Button>
          </Group>
        </Stack>
      </form>

      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          Failed to analyze reviews. Please check your JSON format and try
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
