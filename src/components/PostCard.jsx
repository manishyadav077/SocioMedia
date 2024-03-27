import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/service";
import { multiFormatDateString } from "./lib/utils";


const PostCard = ({ post }) => {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${userData?.$id}`}>
            <img
              src={
                userData?.imageUrl ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
             {post?.creator}
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
        </div>

        <Link
          to={`/update-post/${post?.$id}`}
          className={`${post?.userId !== userData?.$id && "hidden"}`}
        >
          <img
            src="edit.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post?.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post?.caption}</p>
          <ul className="flex gap-1 mt-2">#{post?.tag}</ul>
        </div>

        <img
          src={appwriteService.getFilePreview(post?.imageId)}
          alt="post image"
          className="post-card_img"
        />
      </Link>

      
    </div>
  );
};

export default PostCard;
