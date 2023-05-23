"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  console.log(session?.user.id);

  const handleDelete = async (post) => {
    const hasConfirmed = Swal.fire({
      title: "Delete",
      text: "Are you sure you want to delete this tattoo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#22C55E",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
          const filteredPosts = posts.filter((p) => p._id !== post._id);

          setPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      userId={session?.user.id}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
