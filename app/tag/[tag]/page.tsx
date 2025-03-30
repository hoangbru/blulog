import { Fragment } from "react";

import TagContainer from "./_components/TagContainer";

export default async function Tag({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return (
    <Fragment>
      <TagContainer tag={tag} />
    </Fragment>
  );
}
