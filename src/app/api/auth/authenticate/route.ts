import { MongoClient } from "mongodb";
import { NextResponse  } from "next/server";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { decrypt, parseAndVerifyMessage } from '@/utilities/crypto';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const client = new MongoClient(uri, {});

export async function POST(request: Request) {
  const cookieStore = cookies()
  try {
    await client.connect();
    const db = client.db("ZAuth");
    const collection = db.collection("users");
    
    const data = await request.json();
    console.log(data.email)
    const result = await collection.findOne({ email: data.email });
    await client.close();
    console.log(result)
    if (!result) {
      return NextResponse.redirect("/z-auth/signup");
    }

    const parsed_data = parseAndVerifyMessage(result.password);
    if (parsed_data.valid && parsed_data.body){
      const decrypted_password = decrypt(parsed_data.body);
      if (decrypted_password === data.password) {
        const token = jwt.sign({ userId: result.email }, process.env.NEXT_PUBLIC_JWT_SECRET as string, {
          expiresIn: '10m',
        })
        return NextResponse.json({ success: true, data: result, token: token});
      }
      else{
        return NextResponse.json({ success: false, data: result});
      }
    }
    return NextResponse.json({ success: false, data: result});
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    return NextResponse.json({ error: "Error connecting to MongoDB" });
  }
}

