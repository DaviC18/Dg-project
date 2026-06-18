import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { enUS } from "@clerk/localizations";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doctor Genesis",
  description: "AI to the humanity",
  icons: {
    icon: "/dg-tab.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-US"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable)}
    >
      <body className={`${montserratSans.variable} antialiased`}>
        <ClerkProvider localization={enUS}>{children}</ClerkProvider>
      </body>
    </html>
  );
}
