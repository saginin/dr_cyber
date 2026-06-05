import Link from "next/link";
import { AdminNav } from "@/components/AdminNav";
import { pathways } from "@/lib/config/pathways";
import { pipelineStages } from "@/lib/config/pipeline";
import { requireAdmin } from "@/lib/auth";
import { listLeads } from "@/lib/store";

export default async function LeadsPage({
  searchParams
}: {
  searchParams: Record<string, string | undefined>;
}) {
  requireAdmin();
  const leads = await listLeads(searchParams);
  const activeFilters = [searchParams.q, searchParams.pathway, searchParams.stage, searchParams.startTimeline].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-cloud">
      <AdminNav />
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blueglow">CRM lead list</p>
            <h1 className="mt-2 text-3xl font-bold">Leads</h1>
            <p className="mt-2 text-slate-600">
              Showing {leads.length} lead{leads.length === 1 ? "" : "s"}
              {activeFilters ? ` with ${activeFilters} active filter${activeFilters === 1 ? "" : "s"}` : ""}.
            </p>
          </div>
          <Link className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-bold hover:bg-slate-50" href="/admin">
            Back to dashboard
          </Link>
        </div>

        <form className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 lg:grid-cols-[1.35fr_1fr_1fr_1fr_auto_auto]">
          <label className="text-sm font-semibold text-slate-600">
            Search
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              name="q"
              placeholder="Name, email, phone, profession"
              defaultValue={searchParams.q}
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Pathway
            <select className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" name="pathway" defaultValue={searchParams.pathway}>
              <option value="">All pathways</option>
              {pathways.map((pathway) => (
                <option key={pathway.id}>{pathway.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Stage
            <select className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" name="stage" defaultValue={searchParams.stage}>
              <option value="">All stages</option>
              {pipelineStages.map((stage) => (
                <option key={stage}>{stage}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Timeline
            <select
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              name="startTimeline"
              defaultValue={searchParams.startTimeline}
            >
              <option value="">All timelines</option>
              <option>Immediately</option>
              <option>Within 30 days</option>
              <option>Within 3 months</option>
              <option>Just researching</option>
            </select>
          </label>
          <button className="self-end rounded-md bg-ink px-4 py-2 font-semibold text-white" type="submit">
            Filter
          </button>
          <Link className="self-end rounded-md border border-slate-300 px-4 py-2 text-center font-semibold" href="/admin/leads">
            Reset
          </Link>
        </form>

        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Profession</th>
                <th className="p-3">Pathway</th>
                <th className="p-3">Stage</th>
                <th className="p-3">Timeline</th>
                <th className="p-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-cloud">
                  <td className="p-3 font-semibold">
                    <Link href={`/admin/leads/${lead.id}`}>
                      {lead.firstName} {lead.lastName}
                    </Link>
                  </td>
                  <td className="p-3">
                    <div>{lead.email}</div>
                    <div className="text-slate-500">{lead.phone}</div>
                  </td>
                  <td className="p-3">{lead.currentProfession}</td>
                  <td className="p-3">{lead.pathwayResult}</td>
                  <td className="p-3">
                    <span className="rounded bg-blueglow/10 px-2 py-1 text-xs font-semibold text-blueglow">
                      {lead.pipeline?.stage || "New Lead"}
                    </span>
                  </td>
                  <td className="p-3">{lead.startTimeline}</td>
                  <td className="p-3">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!leads.length ? <p className="p-5 text-sm text-slate-500">No leads match the current filters.</p> : null}
        </div>
      </section>
    </main>
  );
}
