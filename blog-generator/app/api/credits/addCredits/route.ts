import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

const withApiAuthRequiredExtended = withApiAuthRequired as any;

export const GET = withApiAuthRequiredExtended(
  async (request: NextRequest, response: NextResponse) => {
    const { db } = await connectToDatabase();
    try {
      const session = await getSession(request, response);
      const user = session?.user;
      if (!user) {
        return NextResponse.error();
      }
      const userId = user.sub;

      let profile;
      const data = await db
        .collection("profiles")
        .find({
          uid: userId,
        })
        .toArray();

      if (data.length === 0) {
        await db.collection("profiles").insertOne({
          uid: user.sub,
          credits: 10,
        });
        profile = {
          uid: user.sub,
          credits: 10,
        };
      } else {
        // add credits
        profile = data[0];
        await db.collection("profiles").updateOne(
          {
            uid: user.sub,
          },
          {
            $inc: { credits: 10 },
          }
        );
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.log("error");
      return NextResponse.error();
    }
  }
);
