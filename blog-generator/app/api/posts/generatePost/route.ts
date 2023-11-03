import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import OpenAI from "openai";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

// Use withApiAuthRequired to ensure a user session exists
const withApiAuthRequiredExtended = withApiAuthRequired as any;

export const POST = withApiAuthRequiredExtended(
  async (request: NextRequest, response: NextResponse) => {
    const { db } = await connectToDatabase();
    try {
      const session = await getSession(request, response);
      const user = session?.user;

      if (!user) {
        return NextResponse.json(
          { success: false, message: "Error: No User" },
          { status: 500 }
        );
      }

      const profile = await db
        .collection("profiles")
        .find({
          uid: user.sub,
        })
        .toArray();

      if (profile[0].credits < 1) {
        return NextResponse.json(
          { success: false, message: "Not enough credits" },
          { status: 200 }
        );
      }

      const body = await request.json();
      const { description, keywords, tone, title } = body as PostPrompt;

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY as string,
      });

      const generateTitle = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a blog post writer" },
          {
            role: "user",
            content: `Write me a title for a blog post about ${description}. The keywords for the post are as follows: ${keywords}. The tone of the post should be ${tone}. The title should be SEO friendly and no longer than 15 words. Write only one title. ${
              title.length > 0
                ? `Take that title into consideration: ${title}.`
                : ""
            }}. Do not wrap the title in quotes.`,
          },
        ],
        model: "gpt-4",
        temperature: 0.2,
      });

      const titleResponse = generateTitle.choices[0].message.content as string;

      const postGenerator = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a blog post writer.",
          },
          {
            role: "user",
            content: `Write me a short and interesting blog post about ${description}. The title of the article is as follows: ${titleResponse}. These are the keywords for the post: ${keywords}. The blog post should be short and SEO friendly. The tone of the post should be ${tone}. Write it as well as you can. Do not include the title in the post, just start writing the post. Divide the post into paragraphs and write at least 2 short paragraphs. Distinguish the paragraphs with a line break.`,
          },
        ],
        model: "gpt-4",
        temperature: 0.2,
      });

      let postResponse: string = "";
      try {
        postResponse = postGenerator.choices[0].message.content as string;
      } catch (e) {
        return NextResponse.json(
          {
            success: false,
            message: `Error getting content from generatePost: ${JSON.stringify(
              e
            )}`,
          },
          { status: 400 }
        );
      }

      let paragraphs: string[] = [];
      try {
        paragraphs = postResponse?.split("\n\n");
      } catch (e) {
        return NextResponse.json(
          {
            success: false,
            message: `Error getting content from paragraphs: ${JSON.stringify(
              e
            )}`,
          },
          { status: 400 }
        );
      }

      const post: Post = {
        title: titleResponse || "No title generated",
        content: paragraphs || ["No content generated"],
        uid: user.sub,
      };

      // Add post to database
      try {
        await db.collection("posts").insertOne(post);
      } catch (e) {
        return NextResponse.json(
          {
            success: false,
            message: `DB push error: ${JSON.stringify(e)}`,
          },
          { status: 400 }
        );
      }

      try {
        // Decrease credits after each post generation
        await db.collection("profiles").updateOne(
          {
            uid: user.sub,
          },
          {
            $inc: { credits: -10 },
          }
        );
      } catch (e) {
        return NextResponse.json(
          {
            success: false,
            message: `Credit decrease error: ${JSON.stringify(e)}`,
          },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true, post }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "FAILURE" },
        { status: 200 }
      );
    }
  }
);
