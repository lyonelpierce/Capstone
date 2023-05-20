"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.userId.username) ||
        regex.test(item.style) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const clearSearch = () => {
    setSearchText("");
    setSearchedResults([]);
  };

  return (
    <>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search previous generations..."
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer border border-gray-200"
          ></input>
          <button
            type="button"
            onClick={() => clearSearch()}
            className="h-12 bg-orange-600 text-white rounded-r-full pl-4 pr-5 pt-2 pb-2 font-semibold hover:bg-black"
          >
            X
          </button>
        </form>
        {/* <PromptCardList data={posts} handleSearchChange={() => {}} /> */}
      </section>
      <PromptCardList
        data={searchText ? searchedResults : posts}
        handleTagClick={handleTagClick}
      />
    </>
  );
};

export default Feed;
