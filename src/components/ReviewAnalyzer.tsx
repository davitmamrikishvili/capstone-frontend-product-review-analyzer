import { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Stack,
  Title,
  Text,
  Card,
  MultiSelect,
  Loader,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useReviewAnalysis } from "../hooks/useReviews";

const DEFAULT_ASPECTS = [
  "quality",
  "price",
  "durability",
  "design",
  "performance",
];

export function ReviewAnalyzer() {
  const [review, setReview] = useState("");
  const [aspects, setAspects] = useState<string[]>([]);
  const { mutate: analyzeReview, isPending, data, error } = useReviewAnalysis();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!review) return;

    analyzeReview({
      prompt: review,
      aspects: aspects.length > 0 ? aspects : DEFAULT_ASPECTS,
    });
  };

  return (
    <Stack spacing="xl">
      <Title order={2}>Review Sentiment Analysis</Title>

      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <TextInput
            required
            label="Review Text"
            placeholder="Enter the review text to analyze..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <MultiSelect
            label="Aspects to Analyze"
            placeholder="Select aspects or leave empty for default aspects"
            data={DEFAULT_ASPECTS}
            value={aspects}
            onChange={setAspects}
            searchable
            creatable
            getCreateLabel={(query) => `+ Add ${query}`}
          />

          <Group position="right">
            <Button type="submit" loading={isPending}>
              Analyze Review
            </Button>
          </Group>
        </Stack>
      </form>

      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          Failed to analyze review. Please try again.
        </Alert>
      )}

      {isPending && (
        <Card withBorder p="xl">
          <Group position="center">
            <Loader />
            <Text>Analyzing review...</Text>
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
