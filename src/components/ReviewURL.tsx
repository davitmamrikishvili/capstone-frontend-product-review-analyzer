import { useState } from "react";
import {
  TextInput,
  Button,
  Stack,
  Card,
  Group,
  Text,
  Alert,
  Loader,
  Select,
  NumberInput,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useReviewScraping, useReviewAnalysis } from "../hooks/useReviews";
import { AspectSelector } from "./AspectSelector";

import type { ReviewAnalysisResponse } from "../services/api";

const ORDER_OPTIONS = [
  { value: "relevancy", label: "Most Relevant" },
  { value: "submission-desc", label: "Most Recent" },
  { value: "helpful", label: "Most Helpful" },
  { value: "rating-desc", label: "Highest Rating" },
  { value: "rating-asc", label: "Lowest Rating" },
];

interface ReviewURLProps {
  onAnalysisComplete: (result: ReviewAnalysisResponse) => void;
}

export function ReviewURL({ onAnalysisComplete }: ReviewURLProps) {
  const [url, setUrl] = useState("");
  const [order, setOrder] = useState("relevancy");
  const [aspects, setAspects] = useState<string[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(100);

  const {
    mutate: scrapeReviews,
    isPending: isScrapePending,
    error: scrapeError,
  } = useReviewScraping();

  const {
    mutate: analyzeReviews,
    isPending: isAnalysisPending,
    error: analysisError,
  } = useReviewAnalysis({
    onSuccess: onAnalysisComplete,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    scrapeReviews(
      { url, count: reviewCount, order },
      {
        onSuccess: (reviews) => {
          reviews = reviews.reviews;
          analyzeReviews({
            reviews,
            aspects: aspects.length > 0 ? aspects : undefined,
          });
        },
      }
    );
  };

  const isLoading = isScrapePending || isAnalysisPending;
  const error = scrapeError || analysisError;

  return (
    <Stack spacing="xl">
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <TextInput
            required
            label="Product URL"
            placeholder="Enter Walmart product URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
          />

          <Group grow>
            <Select
              label="Sort Order"
              description="How to sort the product reviews"
              data={ORDER_OPTIONS}
              value={order}
              onChange={(value) => setOrder(value || "relevancy")}
              disabled={isLoading}
            />
            <NumberInput
              label="Number of Reviews"
              description="How many reviews to analyze"
              value={reviewCount}
              onChange={(value) => setReviewCount(value || 100)}
              min={1}
              max={1000}
              hideControls
              disabled={isLoading}
            />
          </Group>

          <AspectSelector
            value={aspects}
            onChange={setAspects}
            disabled={isLoading}
          />

          <Group position="right">
            <Button type="submit" loading={isLoading} size="lg">
              Analyze
            </Button>
          </Group>
        </Stack>
      </form>

      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          Failed to process reviews. Please try again.
        </Alert>
      )}

      {isScrapePending && (
        <Card withBorder>
          <Group position="center">
            <Loader />
            <Text>Scraping reviews...</Text>
          </Group>
        </Card>
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
