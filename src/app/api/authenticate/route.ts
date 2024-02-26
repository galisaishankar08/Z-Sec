import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      res.status(200).json({ success: true, data: "Hi" });
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
      res.status(500).json({ error: "Error connecting to MongoDB" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
