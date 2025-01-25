"use client";

import type { PropsWithChildren } from "react";

import { useIsomorphicLayoutEffect } from "@/shared/hooks";

const InjectBodyVhProvider: React.FC<PropsWithChildren> = ({ children }) => {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      document.body.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{children}</>;
};

export default InjectBodyVhProvider;
