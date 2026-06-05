import { NextRequest } from "next/server";

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(request: NextRequest, limit = 20, windowMs = 60_000) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || request.ip || "local";
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  bucket.count += 1;
  return { ok: bucket.count <= limit };
}
