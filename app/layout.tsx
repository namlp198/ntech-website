import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NTECH AI — Demo development",
    template: "%s | NTECH AI",
  },
  description: "Bản dựng phát triển cho website NTECH AI. Nội dung hiện tại là dữ liệu demo.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

