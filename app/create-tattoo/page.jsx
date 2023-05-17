"use client";

import { useState } from "react";

import Form from "@components/Form";
import AImages from "@components/AImages";

const CreateTattoo = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
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
          tag: post.tag,
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
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
      <AImages generationResponse={generationResponse} />
    </>
  );
};

export default CreateTattoo;
