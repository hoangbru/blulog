"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Pagination from "@/components/template/pagination/Pagination";
import PostItem from "@/components/template/PostItem";

import { fetcher } from "@/utils/fetcher";
import { Post } from "@/types/post";
import { PaginationType } from "@/types/pagination";
import { ResponseApi } from "@/types/response";
import { usePostQuery } from "@/context/PostQueryContext";

type PostsResponse = ResponseApi<{
  posts: Post[];
  pagination: PaginationType;
}>;

const HomeContent = () => {
  const { query } = usePostQuery();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      search,
      ...query,
    });
    return params.toString();
  }, [currentPage, query, search]);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data }: PostsResponse = await fetcher(
        `/api/posts?${queryString}`
      );
      if (data) {
        setPosts(data.posts);
        setPagination(data.pagination);
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

  const handlePageChange = (page: number) => {
    if (!pagination) return;
    const { totalPages } = pagination;

    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="col-xl-8 col-lg-7 col-12 mb-24">
      <div className="row">
        {isLoading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : posts.length ? (
          posts.map((post, index) => (
            <PostItem key={index} post={post} index={index} />
          ))
        ) : (
          <p>Hiện không có bài viết nào.</p>
        )}

        {pagination && (
          <Pagination
            currentPage={currentPage}
            pagination={pagination}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default HomeContent;
