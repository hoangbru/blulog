"use client";

import { Suspense } from "react";

import HomeContent from "@/components/template/HomeContent";

export default function Home() {
  return (
    <Suspense fallback={<p>Đang tải trang...</p>}>
      <HomeContent />
    </Suspense>
  );
}
