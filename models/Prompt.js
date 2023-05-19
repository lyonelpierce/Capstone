import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  id: {
    type: String,
    required: [true, "Image Id is required"],
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  style: {
    type: String,
    required: [true, "A style is required"],
  },
  url: {
    type: String,
    required: [true, "Url is required."],
  },
  privacy: {
    type: Boolean,
    required: [true, "Privacy is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
