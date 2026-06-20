import { createClient } from "@/lib/supabase/server";
import { Badge, Card, PageHeader } from "@/components/ui";

export default async function LocationsPage() {
  const supabase = await createClient();
  const { data: locations } = await supabase
    .from("location")
    .select(
      "id, name, code, is_parent, is_training, job_number_prefix, tax_rate, timezone, is_active",
    )
    .order("sort_order");

  return (
    <>
      <PageHeader
        title="Locations"
        subtitle="Branches under New Standard Restoration LLC. Each scopes its own data, workflow overrides, and job numbering."
      />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase text-muted">
                <th className="py-2 pr-4 font-medium">Location</th>
                <th className="py-2 pr-4 font-medium">Code</th>
                <th className="py-2 pr-4 font-medium">Job prefix</th>
                <th className="py-2 pr-4 font-medium">Tax rate</th>
                <th className="py-2 pr-4 font-medium">Timezone</th>
                <th className="py-2 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {(locations ?? []).map((l) => (
                <tr key={l.id} className="border-b border-slate-50">
                  <td className="py-2.5 pr-4 font-medium text-slate-800">
                    {l.name}
                  </td>
                  <td className="py-2.5 pr-4 text-muted">{l.code ?? "—"}</td>
                  <td className="py-2.5 pr-4 text-muted">
                    {l.job_number_prefix ?? "—"}
                  </td>
                  <td className="py-2.5 pr-4 text-muted">
                    {Number(l.tax_rate).toFixed(2)}%
                  </td>
                  <td className="py-2.5 pr-4 text-muted">{l.timezone}</td>
                  <td className="py-2.5">
                    {l.is_parent ? (
                      <Badge tone="blue">Parent</Badge>
                    ) : l.is_training ? (
                      <Badge tone="amber">Training</Badge>
                    ) : (
                      <Badge tone="green">Branch</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
