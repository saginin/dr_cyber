import Link from "next/link";
import { appSettings } from "@/lib/settings";

const webinarDetails = [
  ["Date", "Sunday, June 28, 2026"],
  ["Time", "10:00 AM Mountain Time"],
  ["Duration", "1 hour"],
  ["Format", "Free live webinar with program walkthrough and Q&A"]
];

const agenda = [
  "Why cybersecurity is broader than hacking, and where career switchers usually fit first",
  "How the Cyber Career Switch Program works from pathway quiz to portfolio proof",
  "Which roles to compare: GRC, SOC analyst, cloud security, IAM, vulnerability management, and AI security",
  "What to study first, what to avoid, and how to stop collecting random certifications",
  "Live Q&A so you can ask about your background, timeline, and next step"
];

export default function MasterclassPage() {
  const settings = appSettings();

  return (
    <main className="min-h-screen bg-cloud">
      <section className="relative overflow-hidden bg-navy text-white">
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          src="/images/classroom-instruction.png"
          alt=""
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/35" />
        <div className="relative mx-auto grid min-h-[86vh] max-w-7xl gap-10 px-6 py-10 md:grid-cols-[1.05fr_.95fr] md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Free live masterclass</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Explore the Cyber Career Switch Program
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Join us on June 28, 2026 at 10:00 AM Mountain Time for a 1-hour webinar covering the program, career
              pathways, next steps, and live Q&A. Stay until the end for a bonus.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="focus-ring rounded-md bg-cyan px-5 py-3 font-bold text-navy hover:bg-mint" href={settings.bookingLink}>
                Reserve My Free Seat
              </a>
              <Link className="focus-ring rounded-md border border-white/20 px-5 py-3 font-bold hover:bg-white/10" href="/quiz">
                Take the quiz first
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-glow">
            <img
              className="aspect-[16/11] w-full object-cover"
              src="/images/mentor-group-discussion.png"
              alt="Career switchers discussing cybersecurity pathways in a mentor-led group"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-4 lg:px-8">
          {webinarDetails.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-cloud p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blueglow">{label}</p>
              <p className="mt-2 font-bold">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">What we will cover</h2>
            <p className="mt-4 text-slate-600">
              This session is for non-IT and IT-adjacent professionals who want a clearer path into cybersecurity
              before investing time, money, and energy in the wrong direction.
            </p>
            <ul className="mt-6 space-y-3">
              {agenda.map((item) => (
                <li key={item} className="flex gap-3 rounded-md bg-white p-4 text-sm font-medium shadow-sm">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-mint" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-glow">
            <img
              className="w-full object-cover"
              src="/images/guided-process.png"
              alt="Guided six-step process from uncertainty to practical cybersecurity proof"
            />
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-glow">
            <img
              className="w-full object-cover"
              src="/images/portal-experience.png"
              alt="Student and teacher portal experience for guided cybersecurity learning"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Program preview</p>
            <h2 className="mt-3 text-3xl font-bold">See how the learning path fits together</h2>
            <p className="mt-4 text-slate-300">
              We will walk through how students move from assessment to roadmap, lessons, guided practice, assignments,
              portfolio work, and career transition support.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Pathway roadmap", "Live guidance", "Portfolio proof", "Career Q&A"].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-white/5 p-4 text-sm font-semibold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blueglow">Bonus included</p>
            <h2 className="mt-3 text-3xl font-bold">Stay until the end for the bonus</h2>
            <p className="mt-4 text-slate-600">
              Attendees who stay through the webinar will receive a bonus career-switch resource to help compare target
              roles, first certifications, and portfolio project ideas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="focus-ring rounded-md bg-cyan px-5 py-3 font-bold text-navy hover:bg-mint" href={settings.bookingLink}>
                Reserve My Free Seat
              </a>
              <Link className="focus-ring rounded-md border border-slate-300 px-5 py-3 font-bold hover:bg-cloud" href="/">
                Back to home
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-cloud shadow-glow">
            <img
              className="w-full object-cover"
              src="/images/online-mentor-session.png"
              alt="Learner attending an online cybersecurity mentor session"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
