import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { createQuizSession } from "@/lib/store";

export async function POST(request: NextRequest) {
  if (!rateLimit(request, 30).ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const body = await request.json().catch(() => ({}));
  const session = await createQuizSession(body);
  return NextResponse.json(session);
}
