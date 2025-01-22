"use client";

import { PropsWithChildren, useRef } from "react";

import { keepPreviousData, QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
          placeholderData: keepPreviousData,
        },
      },
    }),
  );

  return <QueryClientProvider client={queryClient.current}>{children}</QueryClientProvider>;
};

export default QueryProvider;
