import { Tabs, Text, Paper } from "@mantine/core";
import { IconRobot, IconSpider, IconList } from "@tabler/icons-react";
import { ReviewAnalyzer } from "./ReviewAnalyzer";
import { ReviewScraper } from "./ReviewScraper";

export function Layout() {
  return (
    <Paper shadow="xs" p="md">
      <Tabs defaultValue="analyze">
        <Tabs.List grow mb="md">
          <Tabs.Tab value="analyze" icon={<IconRobot size="1rem" />}>
            Analyze Reviews
          </Tabs.Tab>
          <Tabs.Tab value="scrape" icon={<IconSpider size="1rem" />}>
            Scrape Reviews
          </Tabs.Tab>
          <Tabs.Tab value="summarize" icon={<IconList size="1rem" />} disabled>
            Summarize Reviews
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="analyze">
          <ReviewAnalyzer />
        </Tabs.Panel>

        <Tabs.Panel value="scrape">
          <ReviewScraper />
        </Tabs.Panel>

        <Tabs.Panel value="summarize">
          <Text color="blue" weight={500}>
            Coming Soon!
          </Text>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
