import "./globals.css";
import React from "react";

export const metadata = {
  title: "Foro Educativo — The Campus Insight Board",
  description: "Reviews, interviews and open debate between students and universities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
