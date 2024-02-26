import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      await client.connect();
      const db = client.db("ZAuth");
      const collection = db.collection("users");

      // Insert the form data into the collection
      const result = await collection.insertOne(req.body);

      // Close the database connection
      await client.close();

      res.status(200).json({ success: true, data: result.ops[0] });
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
      res.status(500).json({ error: "Error connecting to MongoDB" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
