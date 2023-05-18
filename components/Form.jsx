// "use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  return (
    <section className="w-full max-w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <span className="orange_gradient">{type} Tattoo</span>
        <p className="desc text-center max-w-md">
          Create and share amazing tattoos with the world, and let your
          imagination run wild with our AI-powered platform.
        </p>

        {session !== null && pathName === "/create-tattoo" ? (
          <form
            onSubmit={handleSubmit}
            className="mt-10 w-full max-w-2xl flex flex-col gap-1 glassmorphism text-left"
          >
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Your AI Prompt
              </span>

              <textarea
                value={post.prompt}
                onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                placeholder="Write your prompt here..."
                required
                className="form_textarea"
              />
            </label>

            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Tags{" "}
                <span className="font-normal">
                  (#birds, #tree, #watercolor, etc.)
                </span>
              </span>
              <input
                value={post.tag}
                onChange={(e) => setPost({ ...post, tag: e.target.value })}
                type="text"
                placeholder="#tag"
                required
                className="form_input"
              />
            </label>

            <div className="flex-end mx-3 my-3 mb-5 gap-4">
              <Link href="/" className="text-gray-500 text-sm">
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
              >
                {submitting ? `${type}...` : type}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-5">
            <span className="text-2xl text-orange-400">
              Sign In to continue
            </span>
          </div>
        )}
      </h1>
    </section>
  );
};

export default Form;
