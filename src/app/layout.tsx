import type { Metadata } from "next";
import "./ui/globals.css";

import RQProvider from "@/shared/component/RQProvider";
import { Toaster } from "react-hot-toast";

import { ConfigProvider } from "antd";
import Navbar from "./ui/shared/navbar/Navbar";
import Footer from "./ui/shared/footer/Footer";

export const metadata: Metadata = {
  title: "교보문고 | ES 사전 관리 도구",
  description: "교보문고 | ES 사전 관리 도구",
};

const globalTheme = {
  components: {
    Button: {
      colorPrimary: "#374484",
      colorPrimaryBgHover: "#5055b1",
      primaryShadow: "none",
      algorithm: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider theme={globalTheme}>
          <RQProvider>
            <Toaster position="top-center" />
            <div className="flex flex-col justify-between h-dvh px-[20px] pt-[40px] pb-[20px]">
              <Navbar />
              <div className="h-full overflow-auto">{children}</div>
              <Footer />
            </div>
          </RQProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
