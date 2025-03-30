"use client";

import { Fragment } from "react";
import Image from "next/image";

import PostComments from "./PostComments";
import PostTags from "@/components/template/PostTags";

import { formatDate } from "@/utils/format";
import { Post } from "@/types/post";

interface PostDetailsProps {
  post: Post;
}

const PostDetails = ({ post }: PostDetailsProps) => {
  return (
    <Fragment>
      <div className="col-xl-8 col-lg-7 col-12 mb-24">
        <div
          className="bb-post-details-contact"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <div className="inner-post-details-contact mb-2">
            <h4 className="sub-title">{post.title}</h4>
            <div className="row">
              <span className="col-9">{formatDate(post.createdAt)}</span>
              <span className="col-3 text-end author">
                {post.author.fullName}
              </span>
            </div>
          </div>
          <div className="inner-post-details-image">
            <Image
              src={post.thumbnail}
              alt={post.slug}
              width={800}
              height={400}
            />
          </div>
          <div
            className="inner-post-details-contact"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <PostTags post={post}/>
          <PostComments postId={post.id}/>
        </div>
      </div>
    </Fragment>
  );
};

export default PostDetails;
