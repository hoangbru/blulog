import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Toaster } from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: process.env.NEXT_PUBLIC_BASE_URL,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  const messages = await getMessages();
  return (
    <html lang={locale} className={fontRegular.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppProviders>
            <HeaderContainer />
            <Toaster />
            <section className="section-post padding-tb-50">
              <div className="container">
                <div className="row mb-minus-24">
                  {children}
                  <PostSidebar />
                </div>
              </div>
            </section>
            <BackToTop />
            <FooterContainer />
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
