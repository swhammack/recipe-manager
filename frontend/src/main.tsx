// core styles are required for all packages
import "@mantine/core/styles.css";

// ...
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.tsx";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

// async function enableMocking() {
//   if (process.env.NODE_ENV !== "development") {
//     return;
//   }
//
//   const { worker } = await import("./mocks/browser");
//
//   // `worker.start()` returns a Promise that resolves
//   // once the Service Worker is up and ready to intercept requests.
//   return worker.start();
// }
//
// enableMocking().then(() =>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MantineProvider>
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
// );
