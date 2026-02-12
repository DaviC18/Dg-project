import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Doctor Genesis",
  description: "AI to the humanity",
  icons: {
    icon: "/dg-tab.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${montserratSans.variable} antialiased `}>
        {children}
      </body>
    </html>
  );
}
