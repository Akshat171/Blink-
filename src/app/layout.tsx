import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Logo from "../../public/lg.png";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lets Blink",
  icons: {
    icon: "/my-app/public/lg.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
