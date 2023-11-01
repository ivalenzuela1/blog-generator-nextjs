import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-sgnature");

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig!,
        endpointSecret as string
      );
    } catch (err) {
      return NextResponse.error();
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        const { db } = await connectToDatabase();
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const uid = paymentIntent.metadata.uid;

        const profile = await db.collection("profile").find({ uid }).toArray();

        if (profile.length === 0) {
          await db.collection("profile").insertOne({
            uid: uid,
            credits: 10,
          });
        } else {
          await db.collection("profile").updateOne(
            {
              uid,
            },
            {
              $inc: { credits: 10 },
            }
          );
        }

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("error");
    return NextResponse.error();
  }
};
