import { NextRequest, NextResponse } from "next/server";
import { trackEvent } from "@/lib/store";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-webhook-secret");
  if (process.env.WEBHOOK_SHARED_SECRET && secret !== process.env.WEBHOOK_SHARED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  await trackEvent("External Webhook Received", { provider: "ghl", payloadType: body.type || "unknown" });
  return NextResponse.json({ received: true });
}
