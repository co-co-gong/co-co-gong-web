import type { Metadata } from "next";

import { QueryProvider } from "@/app/providers";
import { SUIT } from "@/app/ui";
import { InjectBodyVhProvider } from "@/app/ui/Layout";

import { DvhHeightLayout } from "@/shared/ui/Layout";

import "@/app/ui/styles/global.scss";

export const metadata: Metadata = {
  title: "Co Co Gong",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={SUIT.className}>
        <QueryProvider>
          <InjectBodyVhProvider>
            <DvhHeightLayout dvh={100} heightType="minHeight">
              {children}
            </DvhHeightLayout>
          </InjectBodyVhProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
