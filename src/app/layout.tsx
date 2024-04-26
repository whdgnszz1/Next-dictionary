import type { Metadata } from "next";
import RQProvider from "@/shared/component/RQProvider";

import "./ui/globals.css";
import Navbar from "./ui/shared/navbar/navbar";
import Footer from "./ui/shared/footer/footer";

export const metadata: Metadata = {
  title: "교보문고 ES 사전 관리 도구",
  description: "교보문고 ES 사전 관리 도구",
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
          <div className="flex flex-col justify-between h-dvh px-[20px] pt-[40px] pb-[20px]">
            <Navbar />
            <div className="h-full overflow-auto">{children}</div>
            <Footer />
          </div>
        </RQProvider>
      </body>
    </html>
  );
}
