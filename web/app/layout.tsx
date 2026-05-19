import type { Metadata } from "next";
import { Montserrat, Geist, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="pt-BR" className={cn("font-sans", inter.variable)}>
      <body className={`${montserratSans.variable} antialiased`}>
        <ClerkProvider localization={ptBR}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
