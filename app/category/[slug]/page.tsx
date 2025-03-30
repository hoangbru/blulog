import { Fragment } from "react";

import CategoryContainer from "./_components/CategoryContainer";

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Fragment>
      <CategoryContainer slug={slug} />
    </Fragment>
  );
}
