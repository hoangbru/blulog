"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { PostItem, Pagination } from "@/components/template";
import { ResponseApi } from "@/types/response";
import { Post } from "@/types/post";
import { PaginationType } from "@/types/pagination";
import { fetcher } from "@/utils/fetcher";

interface ListPostsProps {
  categoryId?: string | number;
}

type ProductsResponse = ResponseApi<{
  posts: Post[];
  pagination: PaginationType;
}>;

const ListPosts: FC<ListPostsProps> = ({ categoryId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const queryString = useMemo(() => {
    if (!categoryId) return;

    const params = new URLSearchParams({
      page: currentPage.toString(),
      category: categoryId.toString(),
    });
    return params.toString();
  }, [currentPage, categoryId]);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!queryString) return;

      const { data }: ProductsResponse = await fetcher(
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
          <div>Đang tải...</div>
        ) : error ? (
          <div>{error}</div>
        ) : posts.length ? (
          posts.map((post, index) => (
            <PostItem key={index} post={post} index={index} />
          ))
        ) : (
          <div>Hiện không có bài viết nào.</div>
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

export default ListPosts;
