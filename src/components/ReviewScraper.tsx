import { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Stack,
  Title,
  Text,
  Card,
  Select,
  NumberInput,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useReviewScraping } from "../hooks/useReviews";

const ORDER_OPTIONS = [
  { value: "relevancy", label: "Most Relevant" },
  { value: "submission-desc", label: "Most Recent" },
  { value: "helpful", label: "Most Helpful" },
  { value: "rating-desc", label: "Highest Rating" },
  { value: "rating-asc", label: "Lowest Rating" },
];

export function ReviewScraper() {
  const [url, setUrl] = useState("");
  const [count, setCount] = useState(10);
  const [order, setOrder] = useState("relevancy");

  const { mutate: scrapeReviews, isPending, data, error } = useReviewScraping();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    scrapeReviews({ url, count, order });
  };

  return (
    <Stack spacing="xl">
      <Title order={2}>Scrape Product Reviews</Title>

      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <TextInput
            required
            label="Product URL"
            placeholder="Enter Walmart product URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Group grow>
            <NumberInput
              label="Number of Reviews"
              description="How many reviews to scrape"
              min={1}
              max={100}
              value={count}
              onChange={(val) => setCount(val || 10)}
            />

            <Select
              label="Sort Order"
              description="How to sort the reviews"
              data={ORDER_OPTIONS}
              value={order}
              onChange={(val) => setOrder(val || "relevancy")}
            />
          </Group>

          <Group position="right">
            <Button type="submit" loading={isPending}>
              Scrape Reviews
            </Button>
          </Group>
        </Stack>
      </form>

      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          Failed to scrape reviews. Please check the URL and try again.
        </Alert>
      )}

      {isPending && (
        <Card withBorder p="xl">
          <Group position="center">
            <Text>Scraping reviews... This might take a minute.</Text>
          </Group>
        </Card>
      )}

      {data && (
        <Card withBorder>
          <Stack spacing="md">
            <Title order={3}>Scraped Reviews</Title>
            <Text>Successfully scraped {data.length} reviews.</Text>
            {/* Add review display/export functionality here */}
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
