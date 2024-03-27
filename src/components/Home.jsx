import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/service";
import PostCard from "./PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (posts) {
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
    }
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {loading || !posts ? (
            <h3>Loading...</h3>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts.map((post) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
