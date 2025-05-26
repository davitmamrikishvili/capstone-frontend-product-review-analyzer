import { Container, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Layout } from "./components/Layout";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          fontFamily: "system-ui, -apple-system, sans-serif",
          primaryColor: "blue",
          components: {
            Container: {
              defaultProps: {
                size: "lg",
                px: "md",
              },
            },
          },
        }}
      >
        <Container>
          <Layout />
        </Container>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
