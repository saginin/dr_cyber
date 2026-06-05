import { NextRequest, NextResponse } from "next/server";
import { listLeads, setPipelineStage, trackEvent } from "@/lib/store";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = body?.payload?.email || body?.email || body?.invitee?.email;
  if (email) {
    const [lead] = await listLeads({ q: email });
    if (lead) await setPipelineStage(lead.id, "Call Booked", { status: "Booked" });
    if (lead) await trackEvent("Call Booked", { leadId: lead.id, provider: "calendly" });
  }
  return NextResponse.json({ received: true });
}
