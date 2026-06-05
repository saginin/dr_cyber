import { NextRequest, NextResponse } from "next/server";
import { getLead, setPipelineStage, trackEvent } from "@/lib/store";
import { leadPatchSchema } from "@/lib/validation";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const lead = await getLead(params.id);
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  return NextResponse.json(lead);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const parsed = leadPatchSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  const lead = await getLead(params.id);
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  const stage = parsed.data.stage || lead.pipeline?.stage || "New Lead";
  const pipeline = await setPipelineStage(params.id, stage, parsed.data);
  await trackEvent("Pipeline Updated", { leadId: params.id, stage });
  return NextResponse.json({ pipeline });
}
