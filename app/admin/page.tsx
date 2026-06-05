import Link from "next/link";
import { AdminNav } from "@/components/AdminNav";
import { requireAdmin } from "@/lib/auth";
import { pipelineStages } from "@/lib/config/pipeline";
import { getMetrics } from "@/lib/store";

export default async function AdminDashboard() {
  requireAdmin();
  const metrics = await getMetrics();
  const cards = [
    ["Total leads", metrics.totalLeads],
    ["New this week", metrics.newThisWeek],
    ["Quiz completions", metrics.quizCompletions],
    ["Calls booked", metrics.callsBooked],
    ["Needs follow-up", metrics.needsFollowUp],
    ["Quiz to call", `${metrics.conversionRate}%`],
    ["Enrolled", metrics.enrolled]
  ];
  const maxPathwayCount = Math.max(...Object.values(metrics.leadsByPathway), 1);
  const maxStageCount = Math.max(...Object.values(metrics.leadsByStage), 1);

  return (
    <main className="min-h-screen bg-cloud">
      <AdminNav />
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blueglow">Lead command center</p>
            <h1 className="mt-2 text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-slate-600">Track quiz completions, pathway demand, follow-ups, and pipeline movement.</p>
          </div>
          <Link className="rounded-md bg-cyan px-4 py-3 text-sm font-bold text-navy hover:bg-mint" href="/admin/leads">
            View all leads
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {cards.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-bold">Leads by pathway</h2>
            <div className="mt-4 space-y-3">
              {Object.entries(metrics.leadsByPathway).map(([pathway, count]) => (
                <div key={pathway} className="text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">{pathway}</span>
                    <span className="font-bold">{count}</span>
                  </div>
                  <div className="mt-2 h-2 rounded bg-slate-100">
                    <div className="h-2 rounded bg-blueglow" style={{ width: `${Math.max(8, (count / maxPathwayCount) * 100)}%` }} />
                  </div>
                </div>
              ))}
              {!Object.keys(metrics.leadsByPathway).length ? <p className="text-sm text-slate-500">No leads yet.</p> : null}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Pipeline snapshot</h2>
              <span className="text-sm text-slate-500">{metrics.totalLeads} total</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {pipelineStages.slice(0, 10).map((stage) => (
                <Link
                  key={stage}
                  className="rounded-md border border-slate-200 bg-cloud p-4 hover:border-blueglow"
                  href={`/admin/leads?stage=${encodeURIComponent(stage)}`}
                >
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold">{stage}</span>
                    <span className="font-bold">{metrics.leadsByStage[stage] || 0}</span>
                  </div>
                  <div className="mt-2 h-2 rounded bg-white">
                    <div
                      className="h-2 rounded bg-mint"
                      style={{ width: `${Math.max(0, ((metrics.leadsByStage[stage] || 0) / maxStageCount) * 100)}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="text-xl font-bold">Recent leads</h2>
              <Link className="text-sm font-semibold text-blueglow" href="/admin/leads">
                Open lead list
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="p-3">Lead</th>
                    <th className="p-3">Pathway</th>
                    <th className="p-3">Timeline</th>
                    <th className="p-3">Stage</th>
                    <th className="p-3">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {metrics.recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-cloud">
                      <td className="p-3">
                        <Link className="font-semibold text-ink hover:text-blueglow" href={`/admin/leads/${lead.id}`}>
                          {lead.firstName} {lead.lastName}
                        </Link>
                        <p className="text-slate-500">{lead.email}</p>
                      </td>
                      <td className="p-3">{lead.pathwayResult}</td>
                      <td className="p-3">{lead.startTimeline}</td>
                      <td className="p-3">
                        <span className="rounded bg-blueglow/10 px-2 py-1 text-xs font-semibold text-blueglow">
                          {lead.pipeline?.stage || "New Lead"}
                        </span>
                      </td>
                      <td className="p-3">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!metrics.recentLeads.length ? <p className="p-5 text-sm text-slate-500">No leads yet.</p> : null}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-bold">Follow-up queue</h2>
            <div className="mt-4 divide-y divide-slate-100">
              {metrics.upcomingFollowUps.map((lead) => (
                <Link key={lead.id} className="block py-3 hover:bg-cloud" href={`/admin/leads/${lead.id}`}>
                  <p className="font-semibold">
                    {lead.firstName} {lead.lastName}
                  </p>
                  <p className="text-sm text-slate-500">
                    {lead.pipeline?.nextFollowUpAt
                      ? new Date(lead.pipeline.nextFollowUpAt).toLocaleString()
                      : "No follow-up set"}
                  </p>
                </Link>
              ))}
              {!metrics.upcomingFollowUps.length ? (
                <p className="py-3 text-sm text-slate-500">No follow-ups scheduled yet.</p>
              ) : null}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
