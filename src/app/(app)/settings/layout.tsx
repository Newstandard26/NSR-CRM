import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserContext } from "@/lib/context";

const TABS = [
  { href: "/settings/team", label: "Team & Roles" },
  { href: "/settings/workflow", label: "Workflow Manager" },
  { href: "/settings/config", label: "Configuration" },
  { href: "/settings/locations", label: "Locations" },
];

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await getUserContext();
  if (!ctx) redirect("/login");
  if (!ctx.isAdmin) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
        Settings are restricted to Company Administrators.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
      <aside>
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Settings
        </p>
        <nav className="flex flex-col gap-1">
          {TABS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-700"
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}
