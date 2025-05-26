import { Tabs, Paper } from "@mantine/core";
import { IconWorld, IconJson, IconTable } from "@tabler/icons-react";
import { ReviewURL } from "./ReviewURL";
import { ReviewJSON } from "./ReviewJSON";
import { ReviewCSV } from "./ReviewCSV";

export function Layout() {
  return (
    <Paper shadow="xs" p="md">
      <Tabs defaultValue="url">
        <Tabs.List grow mb="md">
          <Tabs.Tab value="url" icon={<IconWorld size="1rem" />}>
            URL
          </Tabs.Tab>
          <Tabs.Tab value="json" icon={<IconJson size="1rem" />}>
            JSON
          </Tabs.Tab>
          <Tabs.Tab value="csv" icon={<IconTable size="1rem" />}>
            CSV
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="url">
          <ReviewURL />
        </Tabs.Panel>

        <Tabs.Panel value="json">
          <ReviewJSON />
        </Tabs.Panel>

        <Tabs.Panel value="csv">
          <ReviewCSV />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
