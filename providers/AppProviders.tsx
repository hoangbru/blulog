"use client";

import { ReactNode, useEffect } from "react";
import AOS from "aos";

import { AppSettingProvider } from "@/context/AppContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { PostQueryProvider } from "@/context/PostQueryContext";
import { ProfileProvider } from "@/context/ProfileContext";

const AppProviders = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <AppSettingProvider>
      <ProfileProvider>
        <PostQueryProvider>
          <CategoryProvider>{children}</CategoryProvider>
        </PostQueryProvider>
      </ProfileProvider>
    </AppSettingProvider>
  );
};

export default AppProviders;
