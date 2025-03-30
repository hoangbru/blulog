import RecentPosts from "./RecentPosts";

const PostSidebarContainer = () => {
  return (
    <div className="col-xl-4 col-lg-5 col-12 mb-24">
      <div className="bb-post-sidebar">
        <RecentPosts />
      </div>
    </div>
  );
};

export default PostSidebarContainer;