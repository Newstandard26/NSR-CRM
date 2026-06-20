import { PageHeader, SettingsLink } from "@/components/ui";

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        title="Tools"
        subtitle="Automation, templates, and administration"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SettingsLink
          href="/settings/workflow"
          title="Workflow Manager"
          description="Milestones, statuses, work-type tags, and checklists. Live."
        />
        <SettingsLink
          href="/settings/team"
          title="Manage Your Team"
          description="Users, roles, and per-location assignments."
        />
        <SettingsLink
          href="/settings/config"
          title="Company Configuration"
          description="Work types, lead sources, trades, categories, folders."
        />
        <SettingsLink
          href="/settings/locations"
          title="Locations"
          description="Branches, codes, tax rates, and job numbering."
        />
        <SettingsLink
          href="/tools"
          title="Automation Manager"
          description="Rule-based automations. Phase 4."
        />
        <SettingsLink
          href="/tools"
          title="Templates"
          description="Estimate, order, email, and document templates. Phases 5–8."
        />
      </div>
    </>
  );
}
