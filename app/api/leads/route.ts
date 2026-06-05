import { NextRequest, NextResponse } from "next/server";
import { getPathway } from "@/lib/config/pathways";
import { rateLimit } from "@/lib/rateLimit";
import { listLeads, setPipelineStage, trackEvent, upsertLead } from "@/lib/store";
import { leadSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const leads = await listLeads({
    q: searchParams.get("q") || undefined,
    pathway: searchParams.get("pathway") || undefined,
    stage: searchParams.get("stage") || undefined,
    startTimeline: searchParams.get("startTimeline") || undefined
  });
  return NextResponse.json({ leads });
}

export async function POST(request: NextRequest) {
  if (!rateLimit(request, 10).ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const parsed = leadSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid lead" }, { status: 400 });
  const pathway = getPathway("foundation");
  const lead = await upsertLead({
    ...parsed.data,
    phone: parsed.data.phone || "",
    pathwayResult: pathway.name,
    pathwayScoreJson: { foundation: 1 },
    tag: "pathway:foundation"
  });
  await setPipelineStage(lead.id, "New Lead");
  await trackEvent("Lead Submitted", { leadId: lead.id, source: parsed.data.source || "api" });
  return NextResponse.json({ leadId: lead.id, pathway: pathway.name });
}
