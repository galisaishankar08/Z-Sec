import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "../components";


export const metadata: Metadata = {
  title: "Z Auth",
  description: "Enhanced authentication for your app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
