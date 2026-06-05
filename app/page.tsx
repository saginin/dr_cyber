import { ButtonLink } from "@/components/ButtonLink";
import { pathways } from "@/lib/config/pathways";

const domains = ["GRC / Risk", "SOC Analysis", "Cloud Security", "IAM", "Vulnerability Management", "AI Security"];

export default function LandingPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const utm = new URLSearchParams();
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
    const value = searchParams[key];
    if (typeof value === "string") utm.set(key, value);
  });
  const quizHref = `/quiz${utm.toString() ? `?${utm.toString()}` : ""}`;

  return (
    <main>
      <section className="bg-navy text-white">
        <div className="mx-auto grid min-h-[92vh] max-w-7xl gap-10 px-6 py-8 md:grid-cols-[1.05fr_.95fr] md:items-center lg:px-8">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-mint">Free career roadmap quiz</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Switch Into Cybersecurity - Even If You Are Not From IT
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Discover the cybersecurity pathway that fits your background, skills, and career goals. Take the free
              career roadmap quiz and get a personalized learning plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={quizHref}>Take the Free Cyber Career Quiz</ButtonLink>
              <ButtonLink href="#pathways" variant="secondary">
                Explore pathways
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-5 shadow-glow">
            <div className="rounded-md bg-ink p-5">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-slate-300">Pathway matcher</span>
                <span className="rounded bg-mint/15 px-2 py-1 text-xs font-semibold text-mint">Live quiz</span>
              </div>
              <div className="space-y-3">
                {domains.map((domain, index) => (
                  <div key={domain}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{domain}</span>
                      <span className="text-slate-300">{72 - index * 7}% fit</span>
                    </div>
                    <div className="h-2 rounded bg-white/10">
                      <div className="h-2 rounded bg-cyan" style={{ width: `${72 - index * 7}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["From Dentist to Cybersecurity Professional", "A career switch is possible when the roadmap fits your real background."],
              ["Cybersecurity Is Bigger Than Hacking", "Risk, identity, cloud, compliance, SOC, and AI security all need different strengths."],
              ["How the Program Works", "Take the quiz, review your roadmap, book a call, and choose a learning sequence."]
            ].map(([title, copy]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-cloud p-6">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-3 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pathways" className="py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">Cybersecurity Domains</h2>
            <p className="mt-3 text-slate-600">
              The quiz maps transferable strengths to a practical first pathway, then gives you projects and milestones.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pathways.map((pathway) => (
              <article key={pathway.id} className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="font-bold">{pathway.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{pathway.bestFor}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Meet Your Mentors</h2>
            <p className="mt-3 text-slate-300">
              Learn from practitioners who can translate cybersecurity into practical career-switch steps.
            </p>
          </div>
          <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold">Student Pathways</h3>
              <p className="mt-2 text-sm text-slate-300">
                See whether GRC, SOC, cloud, IAM, vulnerability management, AI security, or foundations fit you first.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold">Clear Next Steps</h3>
              <p className="mt-2 text-sm text-slate-300">
                Leave with certifications, projects, and a consultation link instead of generic advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Find your cyber pathway today</h2>
            <p className="mt-2 text-slate-600">The quiz takes about five minutes and creates your personalized roadmap.</p>
          </div>
          <ButtonLink href={quizHref}>Take the Free Cyber Career Quiz</ButtonLink>
        </div>
      </section>
    </main>
  );
}
