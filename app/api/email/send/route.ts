import { NextRequest, NextResponse } from "next/server";
import { getLead } from "@/lib/store";
import { sendQuizResultEmail } from "@/lib/services/email";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const record = body.leadId ? await getLead(body.leadId) : null;
  if (!record) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  await sendQuizResultEmail(record.lead);
  return NextResponse.json({ ok: true });
}
