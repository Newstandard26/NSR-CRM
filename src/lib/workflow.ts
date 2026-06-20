import { createClient } from "@/lib/supabase/server";
import type { Milestone, Status, WorkType } from "@/lib/types";

/**
 * Loads the full workflow (milestones -> statuses -> work-type tags +
 * checklist items) for the current company, assembled into a nested shape
 * ready to render. Reflects Appendix A as seeded.
 */
export async function getWorkflow(): Promise<Milestone[]> {
  const supabase = await createClient();

  const [{ data: milestones }, { data: statuses }, { data: swt }, { data: checklist }] =
    await Promise.all([
      supabase
        .from("milestone")
        .select("id, name, slug, sort_order, kind, is_terminal")
        .order("sort_order"),
      supabase
        .from("status")
        .select("id, name, sort_order, milestone_id")
        .order("sort_order"),
      supabase
        .from("status_work_type")
        .select("status_id, work_type:work_type_id(slug)"),
      supabase
        .from("checklist_item")
        .select("id, label, sort_order, status_id")
        .order("sort_order"),
    ]);

  const wtByStatus = new Map<string, string[]>();
  for (const row of swt ?? []) {
    const slug = (row.work_type as { slug?: string } | null)?.slug;
    if (!slug) continue;
    const list = wtByStatus.get(row.status_id) ?? [];
    list.push(slug);
    wtByStatus.set(row.status_id, list);
  }

  const clByStatus = new Map<string, { id: string; label: string; sort_order: number }[]>();
  for (const ci of checklist ?? []) {
    const list = clByStatus.get(ci.status_id) ?? [];
    list.push({ id: ci.id, label: ci.label, sort_order: ci.sort_order });
    clByStatus.set(ci.status_id, list);
  }

  const statusByMilestone = new Map<string, Status[]>();
  for (const s of statuses ?? []) {
    const list = statusByMilestone.get(s.milestone_id) ?? [];
    list.push({
      id: s.id,
      name: s.name,
      sort_order: s.sort_order,
      milestone_id: s.milestone_id,
      workTypeSlugs: wtByStatus.get(s.id) ?? [],
      checklist: clByStatus.get(s.id) ?? [],
    });
    statusByMilestone.set(s.milestone_id, list);
  }

  return (milestones ?? []).map((m) => ({
    ...m,
    statuses: statusByMilestone.get(m.id) ?? [],
  })) as Milestone[];
}

export async function getWorkTypes(): Promise<WorkType[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("work_type")
    .select("id, name, slug, is_system, sort_order")
    .order("sort_order");
  return (data ?? []) as WorkType[];
}
