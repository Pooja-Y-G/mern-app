import mongoose, { Schema, Types, Document } from "mongoose";

export interface ISummary extends Document {
  original_text: string;
  summary: string;
  user: Types.ObjectId; // ✅ THIS is correct
}

const summarySchema = new Schema<ISummary>({
  original_text: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId, // ✅ schema uses Schema.Types
    ref: "User",
    required: true,
  },
});

export default mongoose.model<ISummary>("Summary", summarySchema);