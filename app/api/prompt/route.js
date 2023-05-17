import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ privacy: true })
      .sort({ _id: -1 })
      .populate("userId")
      .limit(6);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch tattoos", { status: 500 });
  }
};
