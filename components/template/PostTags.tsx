import { FC, Fragment } from "react";
import Link from "next/link";

import IconTags from "@/components/icons/IconTags";

import { Post } from "@/types/post";

interface PostTagsProps {
  post: Post;
}

const PostTags: FC<PostTagsProps> = ({ post }) => {
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center gap-2">
        <IconTags />
        <p className="mb-0">Tags:</p>
        <span>
          {post.tags.map((tag, index) => (
            <Fragment key={tag}>
              {index > 0 && <span>, </span>}
              <Link href={`/tag/${tag}`}>{tag}</Link>
            </Fragment>
          ))}
        </span>
      </div>
    </div>
  );
};

export default PostTags;
