"use client";

import { type ComponentProps, Suspense } from "react";

import { useIsMounted } from "@/shared/hooks";

export const SSRSafeSuspense: React.FC<ComponentProps<typeof Suspense>> = (props) => {
  const isMounted = useIsMounted();

  if (isMounted) return <Suspense {...props} />;

  return <>{props.fallback}</>;
};
