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

      if (data?.post) {
        setPost(data.post);
      } else {
        setError("Post not found.");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setError("Failed to load post, please try again later.");
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
        <p className="container">{error}</p>
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
