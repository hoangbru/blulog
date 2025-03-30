import type { Metadata } from "next";

import TagContainer from "./_components/TagContainer";

type Props = Promise<{ tag: string }>;

export async function generateMetadata({
  params,
}: {
  params: Props;
}): Promise<Metadata> {
  const { tag } = await params;

  const decodedTag = decodeURIComponent(tag);

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tag/${tag}`;
  const title = decodedTag;
  const description = `Các bài viết liên quan đến chủ đề "${decodedTag}".`;

  return {
    title,
    description: `Các bài viết liên quan đến chủ đề ${decodedTag}`,
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

export default async function Tag({ params }: { params: Props }) {
  const { tag } = await params;
  return <TagContainer tag={decodeURIComponent(tag)} />;
}
