import { AdminNav } from "@/components/AdminNav";
import { emailSequence } from "@/lib/config/emailSequence";
import { requireAdmin } from "@/lib/auth";
import { appSettings } from "@/lib/settings";

export default function SettingsPage() {
  requireAdmin();
  const settings = appSettings();
  return (
    <main className="min-h-screen bg-cloud">
      <AdminNav />
      <section className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-3xl font-bold">Automation settings</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            ["Booking link", settings.bookingLink],
            ["Admin notification email", settings.adminNotificationEmail],
            ["Email provider", process.env.EMAIL_PROVIDER || "console"],
            ["SMS enabled", String(settings.smsEnabled)],
            ["Default sender name", settings.senderName],
            ["Program/cohort name", settings.cohortName]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-500">{label}</p>
              <p className="mt-2 break-words font-medium">{value || "Not configured"}</p>
            </div>
          ))}
        </div>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-bold">Email nurture sequence</h2>
          <div className="mt-4 divide-y divide-slate-100">
            {emailSequence.map((email) => (
              <div key={email.key} className="flex items-center justify-between gap-4 py-3 text-sm">
                <div>
                  <p className="font-semibold">{email.subject}</p>
                  <p className="text-slate-500">{email.key}</p>
                </div>
                <span className="rounded bg-blueglow/10 px-2 py-1 font-semibold text-blueglow">
                  Day {email.delayDays}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Edit sequence timing in <code>lib/config/emailSequence.ts</code>. A database-backed editor can replace this config later.
          </p>
        </section>
      </section>
    </main>
  );
}
