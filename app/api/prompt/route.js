import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ privacy: true })
      .sort({ createdAt: -1 })
      .populate("userId")
      .limit(6);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch tattoos", { status: 500 });
  }
};
