import { createClient } from "@/lib/supabase/server";
import { Card, PageHeader } from "@/components/ui";

async function list(table: string, cols = "id, name") {
  const supabase = await createClient();
  const { data } = await supabase.from(table).select(cols).order("sort_order");
  return (data ?? []) as unknown as { id: string; name: string }[];
}

function ConfigCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: { id: string; name: string }[];
}) {
  return (
    <Card>
      <div className="mb-3">
        <h2 className="text-base font-semibold text-ink">{title}</h2>
        <p className="text-xs text-muted">{description}</p>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((i) => (
          <li
            key={i.id}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
          >
            {i.name}
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-sm text-muted">None configured.</li>
        )}
      </ul>
    </Card>
  );
}

export default async function ConfigPage() {
  const [workTypes, trades, leadSources, categories, folders] = await Promise.all([
    list("work_type"),
    list("trade_type"),
    list("lead_source"),
    list("job_category"),
    list("document_folder"),
  ]);

  return (
    <>
      <PageHeader
        title="Configuration"
        subtitle="Company-wide reference data. Editing UIs land alongside their domains; values are live now."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <ConfigCard
          title="Work Types"
          description="Drive the workflow branch (Insurance vs. Retail)."
          items={workTypes}
        />
        <ConfigCard
          title="Trades"
          description="Trade types applied to jobs and estimates."
          items={trades}
        />
        <ConfigCard
          title="Lead Sources"
          description="Where leads originate, including Web-to-Lead."
          items={leadSources}
        />
        <ConfigCard
          title="Job Categories"
          description="Residential, commercial, and beyond."
          items={categories}
        />
        <ConfigCard
          title="Document Folders"
          description="Default folders for job documents."
          items={folders}
        />
      </div>
    </>
  );
}
