import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router/router.tsx";
import "./styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 5 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App: FunctionComponent = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
