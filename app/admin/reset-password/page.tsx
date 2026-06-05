import Link from "next/link";
import { redirect } from "next/navigation";
import { resetAdminPassword } from "@/lib/adminPasswordReset";

async function resetPassword(formData: FormData) {
  "use server";
  const token = String(formData.get("token") || "");
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (password !== confirmPassword) {
    redirect(`/admin/reset-password?token=${encodeURIComponent(token)}&error=mismatch`);
  }

  const result = await resetAdminPassword(token, password);
  if (!result.ok) {
    redirect(`/admin/reset-password?token=${encodeURIComponent(token)}&error=invalid`);
  }

  redirect("/admin/login?reset=1");
}

export default function ResetPasswordPage({
  searchParams
}: {
  searchParams: { token?: string; error?: string };
}) {
  const hasToken = Boolean(searchParams.token);
  const errorMessage =
    searchParams.error === "mismatch"
      ? "Passwords do not match."
      : searchParams.error
        ? "Reset link is invalid or expired."
        : "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4">
      <form action={resetPassword} className="w-full max-w-md rounded-lg border border-white/10 bg-white p-6 shadow-glow">
        <h1 className="text-2xl font-bold">Create new password</h1>
        <p className="mt-2 text-sm text-slate-600">Choose a new admin password for the dashboard.</p>
        <input name="token" type="hidden" value={searchParams.token || ""} />
        {!hasToken ? <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">Missing reset token.</p> : null}
        {errorMessage ? <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p> : null}
        <label className="mt-6 block text-sm font-semibold">
          New password
          <input className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3" name="password" type="password" minLength={8} required />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Confirm password
          <input
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
            name="confirmPassword"
            type="password"
            minLength={8}
            required
          />
        </label>
        <button
          className="mt-6 w-full rounded-md bg-cyan px-5 py-3 font-bold text-navy hover:bg-mint disabled:opacity-50"
          disabled={!hasToken}
          type="submit"
        >
          Save new password
        </button>
        <Link className="mt-5 inline-block text-sm font-semibold text-blueglow hover:underline" href="/admin/login">
          Back to login
        </Link>
      </form>
    </main>
  );
}
