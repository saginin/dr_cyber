import { notFound } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";
import { LeadStatusForm } from "@/components/LeadStatusForm";
import { requireAdmin } from "@/lib/auth";
import { getLead } from "@/lib/store";

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  requireAdmin();
  const record = await getLead(params.id);
  if (!record) notFound();
  const { lead, quizResponses, pipeline, emailLogs, smsLogs } = record;

  return (
    <main className="min-h-screen bg-cloud">
      <AdminNav />
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h1 className="text-3xl font-bold">
              {lead.firstName} {lead.lastName}
            </h1>
            <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Phone:</strong> {lead.phone || "N/A"}</p>
              <p><strong>Profession:</strong> {lead.currentProfession}</p>
              <p><strong>Location:</strong> {lead.city}, {lead.country}</p>
              <p><strong>Timeline:</strong> {lead.startTimeline}</p>
              <p><strong>Tag:</strong> {lead.tag}</p>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-bold">Recommended pathway</h2>
            <p className="mt-2">{lead.pathwayResult}</p>
            <pre className="mt-4 overflow-auto rounded bg-slate-950 p-4 text-xs text-slate-100">
              {JSON.stringify(lead.pathwayScoreJson, null, 2)}
            </pre>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-bold">Quiz responses</h2>
            <div className="mt-4 divide-y divide-slate-100">
              {quizResponses.map((response) => (
                <div key={response.id} className="py-3">
                  <p className="font-semibold">{response.questionText}</p>
                  <p className="text-sm text-slate-600">{response.selectedAnswer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-bold">Pipeline status</h2>
            <LeadStatusForm
              leadId={lead.id}
              currentStage={pipeline?.stage || "New Lead"}
              currentStatus={pipeline?.status || "Open"}
              notes={pipeline?.notes}
              nextFollowUpAt={pipeline?.nextFollowUpAt}
            />
          </section>

          <LogPanel title="Email log" logs={emailLogs} />
          <LogPanel title="SMS log" logs={smsLogs} />
        </aside>
      </section>
    </main>
  );
}

function LogPanel({ title, logs }: { title: string; logs: Array<{ id: string; type: string; status: string; subject?: string; message?: string }> }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-3 divide-y divide-slate-100 text-sm">
        {logs.map((log) => (
          <div key={log.id} className="py-3">
            <p className="font-semibold">{log.subject || log.type}</p>
            <p className="text-slate-500">{log.status}</p>
          </div>
        ))}
        {!logs.length ? <p className="py-3 text-slate-500">No log entries.</p> : null}
      </div>
    </section>
  );
}
