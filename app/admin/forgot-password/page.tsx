import Link from "next/link";
import { redirect } from "next/navigation";
import { requestAdminPasswordReset } from "@/lib/adminPasswordReset";

async function requestReset(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "");
  await requestAdminPasswordReset(email);
  redirect("/admin/forgot-password?sent=1");
}

export default function ForgotPasswordPage({ searchParams }: { searchParams: { sent?: string } }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4">
      <form action={requestReset} className="w-full max-w-md rounded-lg border border-white/10 bg-white p-6 shadow-glow">
        <h1 className="text-2xl font-bold">Reset admin password</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter the admin email address. If it matches the configured admin account, a reset link will be sent.
        </p>
        <label className="mt-6 block text-sm font-semibold">
          Admin email
          <input
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
            name="email"
            type="email"
            defaultValue="saginin@gmail.com"
            required
          />
        </label>
        {searchParams.sent ? (
          <p className="mt-4 rounded bg-mint/10 p-3 text-sm text-emerald-700">
            If the email matches the admin account, a reset link has been sent.
          </p>
        ) : null}
        <button className="mt-6 w-full rounded-md bg-cyan px-5 py-3 font-bold text-navy hover:bg-mint" type="submit">
          Send reset link
        </button>
        <p className="mt-4 text-sm text-slate-600">
          Check the configured email provider logs if local email is set to console mode.
        </p>
        <Link className="mt-5 inline-block text-sm font-semibold text-blueglow hover:underline" href="/admin/login">
          Back to login
        </Link>
      </form>
    </main>
  );
}
