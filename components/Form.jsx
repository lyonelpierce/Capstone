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
          Let your imagination run wild. Create and share your amazing prompts
          and AI tattoos with the world.
        </p>

        {session !== null && pathName === "/create-tattoo" ? (
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
