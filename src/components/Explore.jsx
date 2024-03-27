import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
// import SearchResults from "./SearchResults";
import GridPostList from "./GridPostList";
import appwriteService from "../appwrite/service";
import useDebounce from "../hooks/useDebounce";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const debounceValue = useDebounce(searchValue, 500);
 

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts([]).then((result) => {
      if (result && result.documents) {
        setPosts([result.documents]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [debounceValue]);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/search.svg" alt="search" width={24} height={24} />
          <Input
            type="text"
            placeholder="search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img src="/filter.svg" alt="filter" width={20} height={20} />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {loading ? (
          <div className="flex-center w-full h-full">Loading.....</div>
        ) : searchValue !== "" ? (
          <SearchResults
            // isSearchFetching={isSearchFetching}
            // searchedPosts={searchedPosts}
          />
        ) : posts.length === 0 ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.map((item, index) => (
            <GridPostList key={`post-${index}`} posts={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
