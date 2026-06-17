import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SellerClothes",
  description: "Generate Facebook post text for clothing sellers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
