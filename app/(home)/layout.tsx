import { ReactNode } from "react";

import { PostSidebar } from "@/components/layout";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="row">
      {children}
      <PostSidebar />
    </div>
  );
}
