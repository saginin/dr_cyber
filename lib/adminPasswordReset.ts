import { promises as fs } from "fs";
import path from "path";
import { randomBytes, createHash } from "crypto";
import bcrypt from "bcryptjs";
import { appSettings } from "@/lib/settings";
import { sendProviderEmail } from "@/lib/services/email";

type ResetTokenRecord = {
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
  usedAt?: string;
};

type AdminAuthStore = {
  passwordHash?: string;
  resetTokens: ResetTokenRecord[];
};

const dataDir = path.join(process.cwd(), ".data");
const authFile = path.join(dataDir, "admin-auth.json");

function emptyStore(): AdminAuthStore {
  return { resetTokens: [] };
}

async function readAuthStore(): Promise<AdminAuthStore> {
  try {
    const raw = await fs.readFile(authFile, "utf8");
    return { ...emptyStore(), ...JSON.parse(raw) };
  } catch {
    return emptyStore();
  }
}

async function writeAuthStore(store: AdminAuthStore) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(authFile, JSON.stringify(store, null, 2));
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getAdminLogin() {
  return process.env.ADMIN_LOGIN || process.env.ADMIN_EMAIL || "saginin";
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL || "saginin@gmail.com";
}

export async function getStoredAdminPasswordHash() {
  const store = await readAuthStore();
  return store.passwordHash;
}

export async function requestAdminPasswordReset(email: string) {
  const adminEmail = getAdminEmail().toLowerCase();
  const submittedEmail = email.trim().toLowerCase();

  // Always return success to avoid exposing whether an address is configured.
  if (submittedEmail !== adminEmail) return { accepted: true };

  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000);
  const store = await readAuthStore();
  store.resetTokens = store.resetTokens
    .filter((record) => !record.usedAt && new Date(record.expiresAt).getTime() > now.getTime())
    .slice(-4);
  store.resetTokens.push({
    tokenHash,
    expiresAt: expiresAt.toISOString(),
    createdAt: now.toISOString()
  });
  await writeAuthStore(store);

  const settings = appSettings();
  const resetLink = `${settings.appUrl}/admin/reset-password?token=${token}`;
  const text = `Hi,

A password reset was requested for the Cyber Career Pathway Funnel admin dashboard.

Reset your password here:

${resetLink}

This link expires in 1 hour. If you did not request this, ignore this email.`;

  await sendProviderEmail({
    to: adminEmail,
    subject: "Reset your Cyber Career admin password",
    text,
    html: text.replaceAll("\n", "<br />")
  });

  return { accepted: true };
}

export async function resetAdminPassword(token: string, newPassword: string) {
  if (newPassword.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  const store = await readAuthStore();
  const now = new Date();
  const tokenHash = hashToken(token);
  const tokenRecord = store.resetTokens.find((record) => record.tokenHash === tokenHash);

  if (!tokenRecord || tokenRecord.usedAt || new Date(tokenRecord.expiresAt).getTime() <= now.getTime()) {
    return { ok: false, error: "Reset link is invalid or expired." };
  }

  tokenRecord.usedAt = now.toISOString();
  store.passwordHash = await bcrypt.hash(newPassword, 12);
  await writeAuthStore(store);
  return { ok: true };
}
