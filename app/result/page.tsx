import Link from "next/link";
import { notFound } from "next/navigation";
import { getPathway } from "@/lib/config/pathways";
import { appSettings } from "@/lib/settings";
import { getLead } from "@/lib/store";

export default async function ResultPage({ searchParams }: { searchParams: { id?: string } }) {
  if (!searchParams.id) notFound();
  const record = await getLead(searchParams.id);
  if (!record) notFound();
  const pathway = getPathway(record.lead.pathwayResult);
  const settings = appSettings();

  return (
    <main className="min-h-screen bg-cloud">
      <section className="bg-navy px-6 py-14 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Your recommended pathway</p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">{pathway.name}</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-200">{pathway.why}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="focus-ring rounded-md bg-cyan px-5 py-3 font-bold text-navy hover:bg-mint" href="/book">
              Book a free Cyber Career Roadmap Call
            </Link>
            <a className="focus-ring rounded-md border border-white/20 px-5 py-3 font-bold" href={settings.masterclassLink}>
              Join the free masterclass
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 py-10 md:grid-cols-[1.5fr_.9fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold">Suggested roadmap</h2>
          <ol className="mt-5 space-y-3">
            {pathway.roadmap.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-cyan/15 text-sm font-bold text-blueglow">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </article>

        <aside className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="font-bold">First milestone</h2>
            <p className="mt-2 text-sm text-slate-600">{pathway.certification}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="font-bold">Learning sequence</h2>
            <p className="mt-2 text-sm text-slate-600">{pathway.sequence}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="font-bold">Why it fits</h2>
            <p className="mt-2 text-sm text-slate-600">{pathway.bestFor}</p>
          </div>
        </aside>

        <article className="rounded-lg border border-slate-200 bg-white p-6 md:col-span-2">
          <h2 className="text-2xl font-bold">Portfolio project examples</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {pathway.projects.map((project) => (
              <div key={project} className="rounded-md bg-cloud p-4 text-sm font-medium">
                {project}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">This result is a recommendation, not a guarantee of employment.</p>
        </article>
      </section>
    </main>
  );
}
