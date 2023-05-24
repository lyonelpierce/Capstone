"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { IconTrash } from "@tabler/icons-react";

import Switch from "react-switch";

import Image from "next/image";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const PromptCard = ({ post, handleTagClick, handleDelete }) => {
  console.log(post);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    boxShadow: 24,
    outline: 0,
  };

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
    try {
      const response = await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "PATCH",
        body: JSON.stringify({ privacy: !privacy }),
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
            <h3 className="font-satoshi font-semibold text-gray-900 hover:text-orange-600">
              {post.userId.username}
            </h3>
          </div>
        </div>

        <div className="copy_btn hover:bg-gray-200 p-1" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="Copy Icon"
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <Image
        src={post.url}
        height={512}
        width={512}
        alt={`${post.userId.username} Art`}
        className="rounded-lg image"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Box sx={style}>
          <Image
            src={post.url}
            height={600}
            width={600}
            alt={`${post.userId.username} Art`}
            className="rounded-lg"
          />
        </Box>
      </Modal>
      <p
        className="mt-3 font-inter text-sm"
        onClick={() => handleTagClick && handleTagClick(post.style)}
      >
        <span className="font-semibold text-orange-500">Style: </span>
        <span className="blue_gradient cursor-pointer hover:text-blue-700">
          {post.style}
        </span>
      </p>
      {session?.user.id === post.userId._id && pathName === "/profile" && (
        <>
          <div className="mt-5 flex justify-between border-t border-gray-100 pt-3 items-center h-10">
            <Switch
              onChange={handlePrivacyToggle}
              checked={privacy}
              onColor="#34D399"
              offColor="#EF4444"
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={20}
            />
            <p className="flex-end cursor-pointer text-white">
              <IconTrash
                onClick={handleDelete}
                height={25}
                className="bg-red-500 rounded-full h-8 w-8 p-2 hover:bg-red-400"
              />
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PromptCard;
