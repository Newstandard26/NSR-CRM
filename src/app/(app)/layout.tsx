import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserContext } from "@/lib/context";
import { TopNav } from "@/components/TopNav";
import { LocationSwitcher } from "@/components/LocationSwitcher";
import { UserMenu } from "@/components/UserMenu";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await getUserContext();
  if (!ctx) redirect("/login");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-2.5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
              NSR
            </span>
          </Link>
          <LocationSwitcher
            locations={ctx.locations}
            active={ctx.activeLocation}
          />
          <div className="ml-auto" />
          <UserMenu
            name={ctx.user.full_name ?? "User"}
            email={ctx.user.email ?? ""}
            isAdmin={ctx.isAdmin}
          />
        </div>
        <div className="mx-auto max-w-[1400px] px-4 pb-2">
          <TopNav />
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6">{children}</main>
    </div>
  );
}
