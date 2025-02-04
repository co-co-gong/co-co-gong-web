"use client";

import { PropsWithChildren, useState } from "react";

import { keepPreviousData, QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            placeholderData: keepPreviousData,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
