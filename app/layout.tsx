import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Goal-Based Savings Planner",
  description: "Track your financial goals and savings progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <div className="relative min-h-screen bg-slate-50/50">
          {/* Navigation Bar */}
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
