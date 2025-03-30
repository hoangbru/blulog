"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import CommentBox from "./CommentBox";
import CommentForm from "./CommentForm";

import { PaginationType } from "@/types/pagination";
import { fetcher } from "@/utils/fetcher";
import { ResponseApi } from "@/types/response";
import { Comment } from "@/types/comment";
import { useProfile } from "@/context/ProfileContext";

interface PostCommentsProps {
  postId: string | number;
}

type CommentsResponse = ResponseApi<{
  comments: Comment[];
  pagination: PaginationType;
}>;

const PostComments: FC<PostCommentsProps> = ({ postId }) => {
  const { profile } = useProfile();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      post: postId.toString(),
    });
    return params.toString();
  }, [currentPage, postId]);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data }: CommentsResponse = await fetcher(
        `/api/comments?${queryString}`
      );
      if (data) {
        setComments(data.comments);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments, please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [queryString]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handlePageChange = (page: number) => {
    if (!pagination) return;
    const { totalPages } = pagination;

    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {/* Comments Section */}
      <div className="bb-post-details-comment">
        <div className="main-title">
          <h4>Comments({pagination?.totalItems})</h4>
        </div>

        <div
          className="overflow-auto border rounded p-3"
          style={{ maxHeight: "400px" }}
        >
          {isLoading ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p>{error}</p>
          ) : comments.length ? (
            comments.map((comment, index) => (
              <div key={index}>
                <CommentBox comment={comment} />

                {comment.replies.length > 0 && (
                  <div className="ms-3">
                    {comment.replies.map((reply, index) => (
                      <CommentBox key={index} comment={reply} reply={true} />
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Hiện không có bình luận nào.</p>
          )}
        </div>
      </div>

      {profile ? (
        <CommentForm />
      ) : (
        <div>
          Hãy{" "}
          <Link href="/login" style={{ color: "#6c7fd8" }}>
            đăng nhập
          </Link>{" "}
          để bình luận
        </div>
      )}
    </div>
  );
};

export default PostComments;
