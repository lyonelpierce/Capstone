export const POST = async (req, res) => {
  const { prompt, tag } = await req.json();
  console.log(tag);
  try {
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
          prompt: "Tattoo style, " + prompt,
          modelId: "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3",
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
        await new Promise((resolve) => setTimeout(resolve, 3000));

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

            return new Response(JSON.stringify({ imageUrl, prompt, tag }), {
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
