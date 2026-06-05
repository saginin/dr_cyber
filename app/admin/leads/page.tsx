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

  return (
    <main className="min-h-screen bg-cloud">
      <AdminNav />
      <section className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-3xl font-bold">Leads</h1>
        <form className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-5">
          <input className="rounded-md border border-slate-300 px-3 py-2" name="q" placeholder="Search" defaultValue={searchParams.q} />
          <select className="rounded-md border border-slate-300 px-3 py-2" name="pathway" defaultValue={searchParams.pathway}>
            <option value="">All pathways</option>
            {pathways.map((pathway) => (
              <option key={pathway.id}>{pathway.name}</option>
            ))}
          </select>
          <select className="rounded-md border border-slate-300 px-3 py-2" name="stage" defaultValue={searchParams.stage}>
            <option value="">All stages</option>
            {pipelineStages.map((stage) => (
              <option key={stage}>{stage}</option>
            ))}
          </select>
          <select className="rounded-md border border-slate-300 px-3 py-2" name="startTimeline" defaultValue={searchParams.startTimeline}>
            <option value="">All timelines</option>
            <option>Immediately</option>
            <option>Within 30 days</option>
            <option>Within 3 months</option>
            <option>Just researching</option>
          </select>
          <button className="rounded-md bg-ink px-4 py-2 font-semibold text-white" type="submit">
            Filter
          </button>
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
                  <td className="p-3">{lead.pipeline?.stage || "New Lead"}</td>
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
