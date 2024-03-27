import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
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
        <div>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
