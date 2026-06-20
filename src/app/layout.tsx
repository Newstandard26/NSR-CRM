import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Standard Restoration CRM",
  description: "Operations CRM for New Standard Restoration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
