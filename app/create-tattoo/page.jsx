"use client";

import { useState } from "react";

import Form from "@components/Form";
import AImages from "@components/AImages";

const CreateTattoo = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    style: "",
  });

  const [generationResponse, setGenerationResponse] = useState(null);

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          style: post.style,
        }),
      });
      if (response.ok) {
        const images = await response.json();
        setGenerationResponse(images);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
      <div className="min-h-[100%] mb-10">
        <AImages generationResponse={generationResponse} />
      </div>
    </>
  );
};

export default CreateTattoo;
