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
      <body className="antialiased overflow-x-hidden">
        {/* Global Background Effects from globals.css */}
        <div className="aurora" />
        <div className="grain" />
        <div className="spotlight fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" />

        {/* Content Wrapper */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
