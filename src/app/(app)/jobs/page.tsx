import { PageHeader, Placeholder } from "@/components/ui";

export default function JobsPage() {
  return (
    <>
      <PageHeader
        title="Jobs"
        subtitle="The work-type-driven workflow engine"
      />
      <Placeholder
        title="Jobs & the Advance-Job state machine"
        phase="Phase 3"
        description="The heart of the CRM. Jobs render their milestone/status pipeline dynamically from the work type (Insurance vs. Retail), gated by checklists and per-status permissions. The workflow data is already seeded — see Workflow Manager in Settings."
        bullets={[
          "Work-type-driven milestone/status pipeline",
          "Checklist-gated Advance Job transitions",
          "Faceted filters + saved views",
          "Insurance / adjuster / contact tabs",
        ]}
      />
    </>
  );
}
