import type { Metadata, ResolvingMetadata } from "next";

import PostContainer from "./_components/PostContainer";

type Props = Promise<{ slug: string }>;

export async function generateMetadata(
  {
    params,
  }: {
    params: Props;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  let postData = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch post");

    const json = await res.json();
    postData = json?.data?.post || null;
  } catch (error) {
    console.error("Error fetching post metadata:", error);
  }

  const parentMetadata = await parent;
  const previousImages = parentMetadata?.openGraph?.images || [];
  const title = postData?.title || "Bài viết không tồn tại";
  const description =
    postData?.description || "Không tìm thấy thông tin bài viết này.";
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/post/${slug}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: postData?.thumbnail
        ? [
            {
              url: postData.thumbnail,
              width: 1200,
              height: 630,
              alt: slug,
            },
          ]
        : previousImages.length > 0
        ? previousImages
        : [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/default-post-image.jpg`,
              width: 1200,
              height: 630,
              alt: process.env.NEXT_PUBLIC_APP_NAME,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: postData?.thumbnail
        ? [postData.thumbnail]
        : [`${process.env.NEXT_PUBLIC_BASE_URL}/default-post-image.jpg`],
    },
  };
}

export default async function Product({ params }: { params: Props }) {
  const { slug } = await params;
  return <PostContainer slug={slug} />;
}
