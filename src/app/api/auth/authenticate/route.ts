import { MongoClient } from "mongodb";
import { NextResponse  } from "next/server";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const client = new MongoClient(uri, {});

export async function POST(request: Request) {
  try {
    await client.connect();
    const db = client.db("ZAuth");
    const collection = db.collection("users");

    const data = await request.json();
    const result = await collection.findOne(data.email);

    await client.close();

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    return NextResponse.json({ error: "Error connecting to MongoDB" });
  }
}

