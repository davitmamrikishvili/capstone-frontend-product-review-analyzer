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
          colorScheme: "dark",
          fontFamily: "system-ui, -apple-system, sans-serif",
          primaryColor: "blue",
          components: {
            Container: {
              defaultProps: {
                size: "lg",
                px: "md",
              },
            },
            Paper: {
              defaultProps: {
                withBorder: true,
              },
              styles: {
                root: {
                  borderColor: "#2C2E33",
                },
              },
            },
          },
        }}
      >
        <Container>
          <Layout />
          <footer style={{ marginTop: "2rem", textAlign: "center" }}>
            <p>Made by Davit Mamrikishvili</p>
          </footer>
        </Container>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
