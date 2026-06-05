import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { FunnelLead, MessageLog, PipelineRecord, QuizResponseRecord } from "@/types/funnel";

type EventRecord = {
  id: string;
  leadId?: string;
  sessionId?: string;
  event: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
};

type DataStore = {
  leads: FunnelLead[];
  quizResponses: QuizResponseRecord[];
  pipelineStages: PipelineRecord[];
  emailLogs: MessageLog[];
  smsLogs: MessageLog[];
  events: EventRecord[];
  settings: Record<string, string>;
};

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "store.json");

const emptyStore = (): DataStore => ({
  leads: [],
  quizResponses: [],
  pipelineStages: [],
  emailLogs: [],
  smsLogs: [],
  events: [],
  settings: {}
});

async function readStore(): Promise<DataStore> {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return { ...emptyStore(), ...JSON.parse(raw) };
  } catch {
    return emptyStore();
  }
}

async function writeStore(store: DataStore) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(store, null, 2));
}

export async function trackEvent(event: string, metadata: Record<string, unknown> = {}) {
  const store = await readStore();
  const record = {
    id: randomUUID(),
    event,
    metadata,
    leadId: metadata.leadId as string | undefined,
    sessionId: metadata.sessionId as string | undefined,
    createdAt: new Date().toISOString()
  };
  store.events.push(record);
  await writeStore(store);
  return record;
}

export async function createQuizSession(metadata: Record<string, unknown>) {
  const sessionId = randomUUID();
  await trackEvent("Quiz Started", { ...metadata, sessionId });
  return { sessionId };
}

export async function upsertLead(input: Omit<FunnelLead, "id" | "createdAt" | "updatedAt">) {
  const store = await readStore();
  const now = new Date().toISOString();
  const existingIndex = store.leads.findIndex((lead) => lead.email.toLowerCase() === input.email.toLowerCase());
  const existing = store.leads[existingIndex];
  const lead: FunnelLead = {
    ...existing,
    ...input,
    id: existing?.id || randomUUID(),
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };

  if (existingIndex >= 0) {
    store.leads[existingIndex] = lead;
    store.quizResponses = store.quizResponses.filter((response) => response.leadId !== lead.id);
  } else {
    store.leads.push(lead);
  }

  await writeStore(store);
  return lead;
}

export async function saveQuizResponses(
  leadId: string,
  responses: Omit<QuizResponseRecord, "id" | "leadId" | "createdAt">[]
) {
  const store = await readStore();
  const now = new Date().toISOString();
  store.quizResponses.push(
    ...responses.map((response) => ({
      ...response,
      id: randomUUID(),
      leadId,
      createdAt: now
    }))
  );
  await writeStore(store);
}

export async function setPipelineStage(leadId: string, stage: string, patch: Partial<PipelineRecord> = {}) {
  const store = await readStore();
  const now = new Date().toISOString();
  const existingIndex = store.pipelineStages.findIndex((record) => record.leadId === leadId);
  const record: PipelineRecord = {
    id: store.pipelineStages[existingIndex]?.id || randomUUID(),
    leadId,
    stage,
    status: patch.status || store.pipelineStages[existingIndex]?.status || "Open",
    notes: patch.notes ?? store.pipelineStages[existingIndex]?.notes,
    assignedTo: patch.assignedTo ?? store.pipelineStages[existingIndex]?.assignedTo,
    lastContactedAt: patch.lastContactedAt ?? store.pipelineStages[existingIndex]?.lastContactedAt,
    nextFollowUpAt: patch.nextFollowUpAt ?? store.pipelineStages[existingIndex]?.nextFollowUpAt,
    createdAt: store.pipelineStages[existingIndex]?.createdAt || now,
    updatedAt: now
  };
  if (existingIndex >= 0) store.pipelineStages[existingIndex] = record;
  else store.pipelineStages.push(record);
  await writeStore(store);
  return record;
}

export async function logEmail(leadId: string, type: string, subject: string, status: string) {
  const store = await readStore();
  store.emailLogs.push({
    id: randomUUID(),
    leadId,
    type,
    subject,
    status,
    sentAt: new Date().toISOString()
  });
  await writeStore(store);
}

export async function logSms(leadId: string, type: string, message: string, status: string) {
  const store = await readStore();
  store.smsLogs.push({
    id: randomUUID(),
    leadId,
    type,
    message,
    status,
    sentAt: new Date().toISOString()
  });
  await writeStore(store);
}

export async function listLeads(filters: Record<string, string | undefined> = {}) {
  const store = await readStore();
  return store.leads
    .map((lead) => ({
      ...lead,
      pipeline: store.pipelineStages.find((stage) => stage.leadId === lead.id)
    }))
    .filter((lead) => {
      const q = filters.q?.toLowerCase();
      if (q) {
        const blob = [
          lead.firstName,
          lead.lastName,
          lead.email,
          lead.phone,
          lead.currentProfession,
          lead.pathwayResult
        ]
          .join(" ")
          .toLowerCase();
        if (!blob.includes(q)) return false;
      }
      if (filters.pathway && lead.pathwayResult !== filters.pathway) return false;
      if (filters.stage && lead.pipeline?.stage !== filters.stage) return false;
      if (filters.startTimeline && lead.startTimeline !== filters.startTimeline) return false;
      return true;
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getLead(id: string) {
  const store = await readStore();
  const lead = store.leads.find((item) => item.id === id);
  if (!lead) return null;
  return {
    lead,
    quizResponses: store.quizResponses.filter((item) => item.leadId === id),
    pipeline: store.pipelineStages.find((item) => item.leadId === id),
    emailLogs: store.emailLogs.filter((item) => item.leadId === id),
    smsLogs: store.smsLogs.filter((item) => item.leadId === id),
    events: store.events.filter((item) => item.leadId === id)
  };
}

export async function getMetrics() {
  const store = await readStore();
  const totalLeads = store.leads.length;
  const quizCompletions = store.events.filter((event) => event.event === "Quiz Completed").length;
  const callsBooked = store.pipelineStages.filter((stage) => stage.stage === "Call Booked").length;
  const enrolled = store.pipelineStages.filter((stage) => stage.stage === "Enrolled").length;
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const leadsWithPipeline = store.leads.map((lead) => ({
    ...lead,
    pipeline: store.pipelineStages.find((stage) => stage.leadId === lead.id)
  }));
  const newThisWeek = store.leads.filter((lead) => new Date(lead.createdAt).getTime() >= sevenDaysAgo).length;
  const needsFollowUp = leadsWithPipeline.filter((lead) => {
    if (!lead.pipeline?.nextFollowUpAt) return false;
    return new Date(lead.pipeline.nextFollowUpAt).getTime() <= now;
  }).length;
  const leadsByPathway = store.leads.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.pathwayResult] = (acc[lead.pathwayResult] || 0) + 1;
    return acc;
  }, {});
  const leadsByStage = leadsWithPipeline.reduce<Record<string, number>>((acc, lead) => {
    const stage = lead.pipeline?.stage || "New Lead";
    acc[stage] = (acc[stage] || 0) + 1;
    return acc;
  }, {});
  const leadsByTimeline = store.leads.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.startTimeline] = (acc[lead.startTimeline] || 0) + 1;
    return acc;
  }, {});
  const upcomingFollowUps = leadsWithPipeline
    .filter((lead) => lead.pipeline?.nextFollowUpAt)
    .sort((a, b) => String(a.pipeline?.nextFollowUpAt).localeCompare(String(b.pipeline?.nextFollowUpAt)))
    .slice(0, 6);
  return {
    totalLeads,
    quizCompletions,
    callsBooked,
    enrolled,
    newThisWeek,
    needsFollowUp,
    conversionRate: quizCompletions ? Math.round((callsBooked / quizCompletions) * 100) : 0,
    leadsByPathway,
    leadsByStage,
    leadsByTimeline,
    upcomingFollowUps,
    recentLeads: leadsWithPipeline.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 10)
  };
}
