import { connectToDB } from "@utils/database";

import Prompt from "@models/Prompt";

export const POST = async (req, res) => {
  const { url, id, userId, prompt, style, privacy } = await req.json();
  await connectToDB();

  try {
    const existingPrompt = await Prompt.findOne({ id, userId });
    if (existingPrompt) {
      return new Response("Tattoo already saved");
    } else {
      const newPrompt = new Prompt({ id, url, userId, prompt, style, privacy });
      await newPrompt.save();
      return new Response(JSON.stringify(newPrompt), { status: 201 });
    }
  } catch (error) {
    console.log(error);
  }
};
