"use client";

import { Fragment, useCallback, useEffect, useState } from "react";

import PostDetails from "./PostDetails";
import { Breadcrumb, PreLoader } from "@/components/template";

import { Post } from "@/types/post";
import { ResponseApi } from "@/types/response";
import { fetcher } from "@/utils/fetcher";

interface PostContainerProps {
  slug: string;
}

type PostResponse = ResponseApi<{
  post: Post;
}>;

const PostContainer = ({ slug }: PostContainerProps) => {
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPost = useCallback(async () => {
    if (!slug) return;
    setIsLoading(true);
    setError(null);

    try {
      const { data }: PostResponse = await fetcher(`/api/posts/${slug}`);
      if (data) {
        setPost(data.post);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setError("Không thể tải bài viết, vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (isLoading) return <PreLoader />;

  return (
    <Fragment>
      {error ? (
        <div className="col-xl-8 col-lg-7 col-12 mb-24">{error}</div>
      ) : (
        post && (
          <Fragment>
            <Breadcrumb destination="Danh mục" title={post.category.name} />
            <PostDetails post={post} />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default PostContainer;
