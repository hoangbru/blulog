import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "aos/dist/aos.css";
import "./globals.css";

import {
  BackToTop,
  PostSidebar,
  FooterContainer,
  HeaderContainer,
} from "@/components/layout";

import AppProviders from "@/providers/AppProviders";

const fontRegular = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: "Blulog",
  description: "Blulog - Discover the world",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang={"vi"} className={fontRegular.className}>
      <body>
        <AppProviders>
          <HeaderContainer />
          <Toaster />
          <section className="section-post padding-tb-50">
            <div className="container">
              <div className="row">
                {children}
                <PostSidebar />
              </div>
            </div>
          </section>
          <BackToTop />
          <FooterContainer />
        </AppProviders>
      </body>
    </html>
  );
}
