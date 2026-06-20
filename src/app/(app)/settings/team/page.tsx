import { createClient } from "@/lib/supabase/server";
import { Badge, Card, PageHeader } from "@/components/ui";
import { InviteForm } from "@/components/team/InviteForm";

type AssignmentRow = {
  user_id: string;
  location: { name: string; code: string | null } | null;
  role: { name: string } | null;
};

export default async function TeamPage() {
  const supabase = await createClient();

  const [{ data: users }, { data: roles }, { data: assignments }] =
    await Promise.all([
      supabase
        .from("app_user")
        .select("id, full_name, email, is_active")
        .order("full_name"),
      supabase.from("role").select("id, name, slug, description").order("sort_order"),
      supabase
        .from("user_location")
        .select("user_id, location:location_id(name, code), role:role_id(name)"),
    ]);

  const byUser = new Map<string, AssignmentRow[]>();
  for (const a of (assignments ?? []) as unknown as AssignmentRow[]) {
    const list = byUser.get(a.user_id) ?? [];
    list.push(a);
    byUser.set(a.user_id, list);
  }

  return (
    <>
      <PageHeader
        title="Team & Roles"
        subtitle="Invite users and review per-location role assignments."
      />

      <Card className="mb-6">
        <InviteForm />
      </Card>

      <Card className="mb-6">
        <h2 className="mb-3 text-base font-semibold text-ink">
          Team members ({users?.length ?? 0})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase text-muted">
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Email</th>
                <th className="py-2 pr-4 font-medium">Assignments</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {(users ?? []).map((u) => {
                const a = byUser.get(u.id) ?? [];
                const roleNames = Array.from(
                  new Set(a.map((x) => x.role?.name).filter(Boolean)),
                );
                return (
                  <tr key={u.id} className="border-b border-slate-50">
                    <td className="py-2.5 pr-4 font-medium text-slate-800">
                      {u.full_name ?? "—"}
                    </td>
                    <td className="py-2.5 pr-4 text-muted">{u.email}</td>
                    <td className="py-2.5 pr-4">
                      {roleNames.length ? (
                        <span className="flex flex-wrap gap-1">
                          {roleNames.map((r) => (
                            <Badge key={r} tone="blue">
                              {r}
                            </Badge>
                          ))}
                          <span className="text-xs text-muted">
                            · {a.length} location{a.length === 1 ? "" : "s"}
                          </span>
                        </span>
                      ) : (
                        <span className="text-xs text-muted">No assignment</span>
                      )}
                    </td>
                    <td className="py-2.5">
                      {u.is_active ? (
                        <Badge tone="green">Active</Badge>
                      ) : (
                        <Badge tone="slate">Inactive</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-base font-semibold text-ink">Roles</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(roles ?? []).map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-slate-200 p-3"
            >
              <p className="font-medium text-ink">{r.name}</p>
              <p className="mt-0.5 text-xs text-muted">{r.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
