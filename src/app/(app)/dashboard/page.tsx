import { getUserContext } from "@/lib/context";
import { getWorkflow } from "@/lib/workflow";
import { createClient } from "@/lib/supabase/server";
import { Card, PageHeader, StatCard } from "@/components/ui";

export default async function DashboardPage() {
  const ctx = await getUserContext();
  const milestones = await getWorkflow();
  const pipeline = milestones.filter((m) => m.kind === "pipeline");

  const supabase = await createClient();
  const { data: activity } = await supabase
    .from("activity_log")
    .select("id, action, summary, entity_type, created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <>
      <PageHeader
        title={`Welcome, ${ctx?.user.full_name?.split(" ")[0] ?? "there"}`}
        subtitle={`${ctx?.company?.name ?? "—"} · ${ctx?.activeLocation?.name ?? "All locations"}`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open jobs" value={0} hint="Across pipeline" />
        <StatCard label="Active leads" value={0} hint="Awaiting contact" />
        <StatCard label="Overdue invoices" value={0} hint="Past due balance" />
        <StatCard label="Pending signatures" value={0} hint="Out for signature" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-ink">
            Pipeline by milestone
          </h2>
          <div className="space-y-3">
            {pipeline.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="w-24 shrink-0 text-sm font-medium text-slate-700">
                  {m.name}
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-0 rounded-full bg-brand-500" />
                </div>
                <div className="w-10 text-right text-sm tabular-nums text-muted">
                  0
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            Pipeline values populate once Jobs (Phase 3) is live.
          </p>
        </Card>

        <Card>
          <h2 className="mb-4 text-base font-semibold text-ink">
            Recent activity
          </h2>
          {activity && activity.length > 0 ? (
            <ul className="space-y-3">
              {activity.map((a) => (
                <li key={a.id} className="text-sm">
                  <p className="text-slate-700">{a.summary ?? a.action}</p>
                  <p className="text-xs text-muted">
                    {new Date(a.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">
              No activity yet. Actions across the CRM will appear here.
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
