import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { Post } from "@/types/post";

interface PostItemProps {
  post: Post;
  index: number;
}

const PostItem: FC<PostItemProps> = ({ post, index }) => {
  return (
    <div
      key={post.id}
      className="col-md-6 col-12 mb-24"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={200 * (index + 1)}
    >
      <div className="bb-post-card">
        <Link href={`/post/${post.slug}`}>
          <div className="post-image">
            <Image
              src={post.thumbnail}
              alt={post.slug}
              width={354}
              height={220}
            />
          </div>
        </Link>
        <div className="post-contact">
          <h5 className="line-clamp-1">
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </h5>
          <p className="line-clamp-3">{post.description}</p>
          <div className="post-btn">
            <Link href={`/post/${post.slug}`} className="bb-btn-2">
              Đọc thêm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
