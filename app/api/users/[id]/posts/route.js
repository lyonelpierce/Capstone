import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ userId: params.id })
      .sort({ _id: -1 })
      .populate("userId");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch tattoos", { status: 500 });
  }
};
