import { NextRequest, NextResponse } from "next/server";
import { getLead } from "@/lib/store";
import { sendResultSms } from "@/lib/services/sms";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const record = body.leadId ? await getLead(body.leadId) : null;
  if (!record) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  await sendResultSms(record.lead);
  return NextResponse.json({ ok: true });
}
