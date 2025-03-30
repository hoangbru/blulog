import type { Metadata } from "next";

import CategoryContainer from "./_components/CategoryContainer";

type Props = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Props;
}): Promise<Metadata> {
  const { slug } = await params;

  let categoryData = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch category");
    const json = await res.json();
    categoryData = json?.data?.category || null;
  } catch (error) {
    console.error("Error fetching category metadata:", error);
  }

  const title = categoryData?.name || "Danh mục không tồn tại";
  const description =
    categoryData?.description || "Không tìm thấy thông tin danh mục này.";
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/category/${slug}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Category({ params }: { params: Props }) {
  const { slug } = await params;
  return <CategoryContainer slug={slug} />;
}
