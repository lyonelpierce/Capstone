export const POST = async (req, res) => {
  const { prompt, style } = await req.json();

  const styleOptions = {
    Watercolor: {
      modelId: "69f6f875-1070-4b0a-90c5-3d55c6f3b58b",
      defaultPrompt: "watercolor tattoo style",
    },
    Minimalist: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "minimalist tattoo style, line art",
    },
    Geometric: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "line art, geometric tattoo style",
    },
    Traditional: {
      modelId: "b455e572-6d9b-42e2-82f9-e80813d1c1ba",
      defaultPrompt: "traditional tattoo style",
    },
    Surrealism: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "surrealism tattoo style",
    },
    Realism: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "realism tattoo style",
    },
    Anime: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "anime tattoo style",
    },
    BlackAndGrey: {
      modelId: "4f5ae989-0eab-4a37-97be-54a5ea8d0ccf",
      defaultPrompt: "Ai blackwork tattoo",
    },
    NewSchool: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "New School tattoo style",
    },
    Dotwork: {
      modelId: "bd4ec11e-fd1b-46c4-a159-ef0b48acfcd8",
      defaultPrompt: "dotwork tattoo style",
    },
    Tribal: {
      modelId: "d3e5f41d-0c37-4542-a9b7-3ac04ff74cfe",
      defaultPrompt: "tribal style, tattoo style, black",
    },
    Japanese: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "japanese tattoo style",
    },
    Sketch: {
      modelId: "e6166dfd-9623-4a98-83ad-4decc38785b1",
      defaultPrompt: "Sketch tattoo",
    },
  };

  try {
    const { modelId, defaultPrompt } = styleOptions[style];
    const response = await fetch(
      "https://cloud.leonardo.ai/api/rest/v1/generations",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: process.env.LEONARDO_SECRET,
        },
        body: JSON.stringify({
          prompt: `${prompt}, ${defaultPrompt}`,
          modelId: modelId,
          width: 512,
          height: 512,
          num_images: 3,
          promptMagic: true,
          public: false,
          sd_version: "v2",
        }),
      }
    );
    if (response.ok) {
      const generationResponse = await response.json();
      const generationId = generationResponse.sdGenerationJob.generationId;

      let status = "PENDING";
      while (status === "PENDING") {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const aiImages = await fetch(
          `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              authorization: process.env.LEONARDO_SECRET,
            },
          }
        );

        if (aiImages.ok) {
          const image = await aiImages.json();
          status = image.generations_by_pk.status;
          if (status === "COMPLETE") {
            const imageUrl = image.generations_by_pk.generated_images;

            return new Response(JSON.stringify({ imageUrl, prompt, style }), {
              status: 201,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
