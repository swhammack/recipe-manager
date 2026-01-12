import { render as testingLibraryRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function render(ui: React.ReactNode) {
  const client = new QueryClient();
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={client}>
        <MantineProvider env="test">{children}</MantineProvider>
      </QueryClientProvider>
    ),
  });
}
