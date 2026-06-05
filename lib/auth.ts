import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { getAdminLogin, getStoredAdminPasswordHash } from "@/lib/adminPasswordReset";

const cookieName = "ccpf_admin";

export async function verifyAdmin(loginId: string, password: string) {
  const adminLogin = getAdminLogin();
  const adminPassword = process.env.ADMIN_PASSWORD || "638425@Af";
  const adminHash = (await getStoredAdminPasswordHash()) || process.env.ADMIN_PASSWORD_HASH;

  if (loginId !== adminLogin) return false;
  if (adminHash) return bcrypt.compare(password, adminHash);
  return password === adminPassword;
}

export function setAdminSession() {
  cookies().set(cookieName, "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/"
  });
}

export function requireAdmin() {
  if (cookies().get(cookieName)?.value !== "authenticated") {
    redirect("/admin/login");
  }
}

export function clearAdminSession() {
  cookies().delete(cookieName);
}
