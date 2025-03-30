import React from "react";

const CommentForm = () => {
  return (
    <div className="bb-post-details-comment">
      <div className="main-title">
        <h4>Leave A Reply</h4>
      </div>
      <form method="post">
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="bb-details-input">
              <input type="text" placeholder="Enter Your Name" />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="bb-details-input">
              <input type="email" placeholder="Enter Your Email" />
            </div>
          </div>
          <div className="col-12">
            <div className="bb-details-input">
              <textarea placeholder="Message"></textarea>
            </div>
          </div>
          <div className="col-12">
            <div className="bb-details-buttons">
              <a href="#" className="bb-btn-2">
                Send Now
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
