import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { multiFormatDateString } from "./lib/utils";
import { Button } from "./ui/button";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    setLoading(true);
    if (id) {
      appwriteService.getPost(id).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    }
    setLoading(false);
  }, []);

  const handleDeletePost = () => {
    appwriteService.deletePost(id);
    navigate(-1);
  };

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost"
        >
          <img src={"/back.svg"} alt="back" width={24} height={24} />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>
      {loading || !post ? (
        <h2>Loading....</h2>
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${userData?.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    userData?.imageUrl ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />

                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post.creator}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.id}`}
                  className={`${userData?.$id !== post?.userId && "hidden"}`}
                >
                  <img src="/edit.svg" alt="edit" height={24} width={24} />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    userData?.$id !== post?.userId ? "hidden" : ""
                  }`}
                >
                  <img src="/delete.svg" alt="delete" width={24} height={24} />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">#{post?.tag}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
