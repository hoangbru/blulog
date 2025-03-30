import { Fragment } from "react";

import PostContainer from "./_components/PostContainer";

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Fragment>
      <PostContainer slug={slug} />
    </Fragment>
  );
}
