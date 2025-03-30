"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import PostSidebarCard from "./PostSidebarCard";

import { fetcher } from "@/utils/fetcher";
import { ResponseApi } from "@/types/response";
import { Post } from "@/types/post";
import { PaginationType } from "@/types/pagination";

type PostsResponse = ResponseApi<{
  posts: Post[];
  pagination: PaginationType;
}>;

const RecentPosts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      limit: "3",
      sort: "date",
    });
    return params.toString();
  }, []);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data }: PostsResponse = await fetcher(
        `/api/posts?${queryString}`
      );
      if (data) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Không thể tải danh sách bài viết, vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  }, [queryString]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div
      className="post-inner-contact"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="200"
    >
      <div className="post-sidebar-title">
        <h4>Bài viết gần đây</h4>
      </div>
      {isLoading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p>{error}</p>
      ) : posts.length ? (
        posts.map((post, index) => <PostSidebarCard key={index} post={post} />)
      ) : (
        <p>Hiện không có bài viết mới nào.</p>
      )}
    </div>
  );
};

export default RecentPosts;
