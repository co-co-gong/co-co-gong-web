import type { Metadata } from "next";

import { QueryProvider } from "@/app/providers";
import { SUIT } from "@/app/ui";

import "@/app/ui/styles/global.scss";

export const metadata: Metadata = {
  title: "Co Co Gong",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={SUIT.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
