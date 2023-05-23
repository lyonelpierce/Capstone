import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import { IconUserX } from "@tabler/icons-react";

import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session?.user.id, data[0]?.userId._id);

  const deleteUser = async () => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "All your data will be lost and can't be recovered",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#22C55E",
      confirmButtonColor: "#d33",

      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(
          `/api/users/${session.user.id.toString()}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          console.log("hello");
        }
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="w-full">
      <div className="flex flex-col justify-between">
        <h1 className="head_text text-left">
          <span className="orange_gradient">{name} Profile</span>
        </h1>
        <p className="desc text-left">{desc}</p>
        {(!data[0] || session?.user.id === data[0]?.userId._id) && (
          <div>
            <button
              className="flex items-center gap-2 h-9 bg-red-500 font-semibold mt-6 text-white px-5 rounded-full text-sm hover:bg-red-600"
              onClick={deleteUser}
            >
              <IconUserX />
              <span className="align-middle">Delete my account</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
