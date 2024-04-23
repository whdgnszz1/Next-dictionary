import type { Metadata } from "next";
import RQProvider from "@/shared/component/RQProvider";

import "./ui/globals.css";
import Navbar from "./ui/shared/navbar/navbar";
import Footer from "./ui/shared/footer/footer";

export const metadata: Metadata = {
  title: "Dictionary App",
  description: "Dictionary App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RQProvider>
          <div className="flex flex-col justify-between h-screen px-[20px] pt-[40px]">
            <Navbar />
            <div className="h-full">{children}</div>
            <Footer />
          </div>
        </RQProvider>
      </body>
    </html>
  );
}
