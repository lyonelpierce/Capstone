import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

import Image from "next/image";

import {
  IconDownload,
  IconEyeCheck,
  IconDeviceFloppy,
} from "@tabler/icons-react";

const AImages = ({ generationResponse }) => {
  // Notification Message
  const notify = () =>
    toast.success("Tattoo saved successfully", {
      style: {
        background: "green",
        color: "white",
      },
    });

  const notifyError = () =>
    toast.error("Tattoo already saved", {
      style: {
        background: "#d37b77",
        color: "white",
      },
    });

  // Destructure Session Info
  const { data: session } = useSession();

  // Handle Save
  const handleSaveImg = async (imageObj, privacy) => {
    try {
      const { prompt, tag } = generationResponse;
      const existingPrompt = await fetch("/api/prompt/save", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          id: imageObj.id,
          tag,
          prompt,
          url: imageObj.url,
          privacy,
        }),
      });
      if (existingPrompt.ok) {
        if (existingPrompt.status === 201) {
          notify();
        } else {
          notifyError();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Download
  const handleDownload = async (imageObj) => {
    try {
      const response = await fetch(imageObj.url);
      const blob = await response.blob();

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "image.jpg"; // Set the filename you desire
      downloadLink.click();
    } catch (error) {
      console.log("Error downloading image:", error);
    }
  };

  if (!generationResponse) {
    return null; // Return null if generationResponse is null
  }

  return (
    <section className="w-full max-w-full flex-center flex-col mt-5">
      <h2 className="subtitle_text text-left">
        <span className="orange_gradient">AI Generated Art</span>
      </h2>
      {/* Render a component for each object in the generationResponse array */}
      {/* <div className="prompt_card"> */}
      <div className="mt-10 flex flex-col gap-5 md:flex md:flex-row md:gap-5">
        {generationResponse.imageUrl.map((imageObj, index) => (
          <div key={index}>
            <div className="prompt_card">
              <Image
                src={imageObj.url}
                alt={`AI Art ${index + 1}`}
                width={512}
                height={512}
                className="rounded-lg"
              />
              <div className="flex flex-row space-x-3 mt-3 flex-center">
                <button
                  className="bg-primary-orange text-white text-sm font-semibold px-2.5 py-3 rounded-lg flex"
                  onClick={() => handleSaveImg(imageObj, true)}
                >
                  <IconEyeCheck width={25} height={20} />
                  Save Public
                </button>
                <button
                  className="bg-orange-400 text-white text-sm font-semibold px-2.5 py-3 rounded-lg flex"
                  onClick={() => handleSaveImg(imageObj, false)}
                >
                  <IconDeviceFloppy width={25} height={20} />
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-2.5 py-3 rounded-full"
                  onClick={() => handleDownload(imageObj)}
                >
                  <IconDownload width={25} height={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
      <Toaster position="bottom-right" />
    </section>
  );
};

export default AImages;
