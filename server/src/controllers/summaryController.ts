import { Request, Response } from "express";
import Summary from "../models/Summaries";
import mongoose from "mongoose";
// import { generateSummary } from "../services/aiService";

export const getSummaries = async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Convert user ID from JWT to Mongoose ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Fetch all summaries for this user
    const summaries = await Summary.find({ user: userId }).sort({ createdAt: -1 });

    // If you want static fallback for testing (without DB), you can do:
    // const summaries = [
    //   { original_text: "Example text", summary: "Example summary" }
    // ];

    res.json(summaries);
  } catch (error: any) {
    console.error("getSummaries Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createSummary = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    // Call Hugging Face AI service
    // const summaryText = await generateSummary(text);
    const summaryText = "removed generate summary due to error"

    const summary = await Summary.create({
      original_text: text,
      summary: summaryText,
      user: new mongoose.Types.ObjectId(req.user.id),
    });

    res.status(201).json(summary);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};