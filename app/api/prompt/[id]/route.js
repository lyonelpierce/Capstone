import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

// READ
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("userId");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch tattoos", { status: 500 });
  }
};

// PATCH
export const PATCH = async (request, { params }) => {
  const { prompt } = await request.json();

  try {
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.privacy = !existingPrompt.privacy;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
