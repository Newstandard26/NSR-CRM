import { getWorkflow, getWorkTypes } from "@/lib/workflow";
import { Badge, Card, PageHeader } from "@/components/ui";

const KIND_TONE: Record<string, "blue" | "green" | "amber" | "red" | "slate"> = {
  pipeline: "blue",
  closed: "green",
  canceled: "amber",
  dead: "red",
};

function workTypeBadge(slug: string) {
  if (slug === "insurance") return <Badge tone="purple" key={slug}>Insurance</Badge>;
  if (slug === "retail") return <Badge tone="green" key={slug}>Retail</Badge>;
  return (
    <Badge tone="slate" key={slug}>
      {slug.charAt(0).toUpperCase() + slug.slice(1)}
    </Badge>
  );
}

export default async function WorkflowPage() {
  const [milestones, workTypes] = await Promise.all([
    getWorkflow(),
    getWorkTypes(),
  ]);
  const totalWorkTypes = workTypes.length;

  return (
    <>
      <PageHeader
        title="Workflow Manager"
        subtitle="Milestones → statuses → work-type tags → checklists. Seeded from your AccuLynx workflow (Appendix A)."
      />

      <Card className="mb-6">
        <p className="text-sm font-medium text-slate-700">Work Types</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {workTypes.map((wt) => workTypeBadge(wt.slug))}
        </div>
        <p className="mt-3 text-xs text-muted">
          Statuses tagged for a specific work type only appear on jobs of that
          type — this is the Insurance vs. Retail branch. Drag-to-reorder and
          live editing land in Phase 3.
        </p>
      </Card>

      <div className="space-y-5">
        {milestones.map((m) => (
          <Card key={m.id}>
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-base font-semibold text-ink">{m.name}</h2>
              <Badge tone={KIND_TONE[m.kind]}>{m.kind}</Badge>
              <span className="text-xs text-muted">
                {m.statuses.length} status{m.statuses.length === 1 ? "" : "es"}
              </span>
            </div>

            {m.statuses.length === 0 ? (
              <p className="text-sm text-muted">
                Terminal milestone — no active statuses.
              </p>
            ) : (
              <ol className="divide-y divide-slate-100">
                {m.statuses.map((s, i) => {
                  const isAll = s.workTypeSlugs.length === totalWorkTypes;
                  return (
                    <li
                      key={s.id}
                      className="flex flex-wrap items-center gap-2 py-2"
                    >
                      <span className="w-6 text-right text-xs tabular-nums text-muted">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-slate-800">
                        {s.name}
                      </span>
                      {s.checklist.length > 0 && (
                        <Badge tone="slate">
                          {s.checklist.length} checklist
                        </Badge>
                      )}
                      <span className="ml-auto flex flex-wrap gap-1">
                        {isAll ? (
                          <Badge tone="blue">All work types</Badge>
                        ) : (
                          s.workTypeSlugs.map((slug) => workTypeBadge(slug))
                        )}
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
