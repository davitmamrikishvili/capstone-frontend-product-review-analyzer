import { Card, Group, Stack, Text, Progress, ThemeIcon } from "@mantine/core";
import {
  IconMoodHappy,
  IconMoodSad,
  IconMoodNeutral,
} from "@tabler/icons-react";
import { type ReviewAnalysisResponse } from "../services/api";

interface AnalysisResultProps {
  result: ReviewAnalysisResponse["results"][0];
}

function isGeneralSentiment(
  result: ReviewAnalysisResponse["results"][0]
): result is { review: string; label: string; score: number } {
  return "label" in result && "score" in result;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  const getSentimentColor = (label: string) => {
    switch (label.toUpperCase()) {
      case "POSITIVE":
        return "teal";
      case "NEGATIVE":
        return "red";
      default:
        return "gray";
    }
  };

  const getSentimentIcon = (label: string, size = "1.2rem") => {
    switch (label.toUpperCase()) {
      case "POSITIVE":
        return <IconMoodHappy size={size} />;
      case "NEGATIVE":
        return <IconMoodSad size={size} />;
      default:
        return <IconMoodNeutral size={size} />;
    }
  };

  return (
    <Card withBorder radius="md" p="lg">
      <Stack spacing="md">
        {isGeneralSentiment(result) ? (
          <>
            <Group position="apart" align="center" mb="md">
              <Group spacing="xs">
                <ThemeIcon
                  color={getSentimentColor(result.label)}
                  variant="light"
                  size="lg"
                  radius="xl"
                >
                  {getSentimentIcon(result.label)}
                </ThemeIcon>
                <Text size="sm" weight={500}>
                  Overall Sentiment
                </Text>
              </Group>
              <Group spacing="xs" sx={{ flexGrow: 1, maxWidth: '60%' }}>
                <Progress
                  value={result.score * 100}
                  color={getSentimentColor(result.label)}
                  size="xl"
                  radius="xl"
                  sx={{ flexGrow: 1 }}
                />
                <Text weight={700} color={getSentimentColor(result.label)} w={60}>
                  {`${(result.score * 100).toFixed(1)}%`}
                </Text>
              </Group>
            </Group>
            <Text size="sm" color="dimmed" mb="sm" sx={{ lineHeight: 1.6 }}>
              {result.review}
            </Text>
          </>
        ) : (
          <>
            <Text size="sm" color="dimmed" mb="md" sx={{ lineHeight: 1.6 }}>
              {result.review}
            </Text>
            <Stack spacing="sm">
              {result.details?.map(({ aspect, label, score }) => (
                <Card
                  key={aspect}
                  withBorder
                  p="md"
                  radius="md"
                  sx={(theme) => ({
                    backgroundColor: theme.fn.rgba(
                      theme.colors[getSentimentColor(label)][1],
                      0.05
                    ),
                  })}
                >
                  <Stack spacing="sm">
                    <Group position="apart">
                      <Group spacing="xs">
                        <ThemeIcon
                          color={getSentimentColor(label)}
                          variant="light"
                          size="md"
                          radius="xl"
                        >
                          {getSentimentIcon(label, "1rem")}
                        </ThemeIcon>
                        <Text weight={500} transform="capitalize">
                          {aspect}
                        </Text>
                      </Group>
                      <Text weight={700} color={getSentimentColor(label)}>
                        {`${(score * 100).toFixed(1)}%`}
                      </Text>
                    </Group>
                    <Progress
                      value={score * 100}
                      color={getSentimentColor(label)}
                      size="md"
                      radius="xl"
                    />
                  </Stack>
                </Card>
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
}
