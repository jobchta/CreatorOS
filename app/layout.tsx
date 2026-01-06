import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogicLoom - Creator Business OS",
  description: "The all-in-one business operating system for creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-slate-950 text-slate-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
