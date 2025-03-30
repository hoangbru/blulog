import { FC, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/utils/format";
import { Post } from "@/types/post";

interface PostSidebarCardProps {
  post: Post;
}

const PostSidebarCard: FC<PostSidebarCardProps> = ({ post }) => {
  return (
    <Fragment>
      {post && (
        <div className="post-sidebar-card">
          <Link href={`/post/${post.slug}`}>
            <div className="inner-image">
              <Image
                src={post.thumbnail}
                alt={post.slug}
                width={80}
                height={80}
              />
            </div>
          </Link>
          <div className="post-sidebar-contact">
            <Link href={`/category/${post.category.slug}`}>
              {post.category.name}
            </Link>
            <h4>
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </h4>
            <p>{formatDate(post.createdAt, "short")}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PostSidebarCard;
