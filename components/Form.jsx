"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Form = ({ post, setPost, submitting, handleSubmit }) => {
  // SECONDS COUNTER
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (submitting) {
      intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 10); // Change interval to 10 milliseconds (0.01 seconds)
    } else {
      setCounter(0);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [submitting]);

  const formatCounter = (counter) => {
    const seconds = Math.floor(counter / 100);
    const milliseconds = (counter % 100).toString().padStart(2, "0");
    return `${seconds}.${milliseconds}`;
  };

  return (
    <section className="w-full max-w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <span className="orange_gradient">Create Tattoo</span>
      </h1>
      <p className="desc text-center max-w-md">
        Let your imagination run wild. Create and share your amazing prompts and
        AI tattoos with the world.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-1 glassmorphism text-left"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Style
          </span>
          <select
            value={post.style}
            onChange={(e) => setPost({ ...post, style: e.target.value })}
            type="text"
            required
            className="form_input"
          >
            <option disabled value="">
              Select a style
            </option>
            <option value="Watercolor">Watercolor</option>
            <option value="Minimalist">Minimalist</option>
            <option value="Geometric">Geometric</option>
            <option value="Traditional">Traditional</option>
            <option value="Surrealism">Surrealism</option>
            <option value="Realism">Realism</option>
            <option value="Anime">Anime</option>
            <option value="BlackAndGrey">Black and Grey</option>
            <option value="NewSchool">New School</option>
            <option value="Dotwork">Dotwork</option>
            <option value="Tribal">Tribal</option>
            <option value="Japanese">Japanese</option>
            <option value="Sketch">Sketch</option>
          </select>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Idea
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        <div className="flex-end mx-3 my-3 mb-5 gap-4">
          <Link
            href="/"
            className="text-gray-500 text-sm hover:text-orange-600"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white md:min-w-[15%] md:max-w-[15%] hover:bg-orange-700"
          >
            {submitting ? formatCounter(counter) : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
