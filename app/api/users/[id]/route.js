import { connectToDB } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/Prompt";

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const deletedUser = await User.findByIdAndRemove(params.id);

    if (!deletedUser) {
      return new Response("User not found", { status: 404 });
    }

    await Prompt.deleteMany({ userId: params.id });

    return new Response("User deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete user", { status: 500 });
  }
};
