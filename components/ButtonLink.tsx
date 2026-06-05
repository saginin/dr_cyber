import Link from "next/link";
import { clsx } from "clsx";

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      className={clsx(
        "focus-ring inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition",
        variant === "primary"
          ? "bg-cyan text-navy shadow-glow hover:bg-mint"
          : "border border-white/20 bg-white/10 text-white hover:bg-white/15"
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
