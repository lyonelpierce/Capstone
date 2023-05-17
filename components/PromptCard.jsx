"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { IconTrash } from "@tabler/icons-react";

import Switch from "react-switch";

const PromptCard = ({ post, handleTagClick, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [privacy, setPrivacy] = useState(post.privacy);

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handlePrivacyToggle = async () => {
    console.log(post);
    try {
      const response = await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "PATCH",
        body: JSON.stringify({ prompt: post.prompt }),
      });
      if (response.ok) {
        setPrivacy(!privacy);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileClick = () => {
    if (post.userId === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.userId._id}?name=${post.userId.username}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.userId.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.userId.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.userId.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="Copy Icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <Image
        src={post.url}
        height={512}
        width={512}
        alt={`${post.userId.username} Art`}
        className="rounded-lg"
      />
      <p
        className="mt-3 font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.userId._id && pathName === "/profile" && (
        <div className="mt-5 flex justify-between border-t border-gray-100 pt-3 align-middle">
          <Switch
            onChange={handlePrivacyToggle}
            checked={privacy}
            onColor="#34D399" // Customize the colors according to your preference
            offColor="#EF4444"
            checkedIcon={false}
            uncheckedIcon={false}
            handleDiameter={20}
          />
          <p className="cursor-pointer text-red-600">
            <IconTrash onClick={handleDelete} height={25} />
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;