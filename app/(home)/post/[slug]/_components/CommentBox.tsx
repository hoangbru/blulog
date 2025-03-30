import { FC, Fragment } from "react";
import Image from "next/image";

import { Comment } from "@/types/comment";
import { formatDate } from "@/utils/format";

interface CommentBoxProps {
  reply?: boolean;
  comment: Comment;
}

const CommentBox: FC<CommentBoxProps> = ({ reply, comment }) => {
  return (
    <Fragment>
      <div className={`bb-comment-box ${reply && "bb-pl-50"}`}>
        <div className="inner-image">
          <Image
            src={comment?.user?.avatar}
            alt={`comment-${comment?.user?.fullName}`}
            width={50}
            height={50}
          />
        </div>
        <div className="inner-contact">
          <h5 className="sub-title">{comment?.user?.fullName}</h5>
          <span>{formatDate(comment?.createdAt)}</span>
          <p>{comment?.content}</p>
          <a href="#" className="bb-details-btn">
            Reply <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default CommentBox;
