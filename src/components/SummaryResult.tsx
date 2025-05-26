import { Paper, Text, Title, Group, ThemeIcon } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";

interface SummaryResultProps {
  summary: string;
}

export function SummaryResult({ summary }: SummaryResultProps) {
  return (
    <Paper shadow="xs" p="lg" withBorder radius="md" mb="md">
      <Group position="apart" align="center" mb="md">
        <Group spacing="xs">
          <ThemeIcon color="blue" variant="light" size="lg" radius="xl">
            <IconFileDescription size="1.2rem" />
          </ThemeIcon>
          <Title order={4}>Summary</Title>
        </Group>
      </Group>
      <Text
        size="sm"
        color="lightgoldenrodyellow"
        sx={{
          lineHeight: 1.6,
          whiteSpace: "pre-line",
        }}
      >
        {summary}
      </Text>
    </Paper>
  );
}
