import { PageHeader, Placeholder } from "@/components/ui";

export default function LeadsPage() {
  return (
    <>
      <PageHeader title="Leads" subtitle="Unassigned · Assigned · Distributed" />
      <Placeholder
        title="Lead intake & distribution"
        phase="Phase 3"
        description="Capture and route leads through the early funnel, including web-to-lead and lead ranking, before they convert to jobs."
        bullets={[
          "Unassigned → Assigned → Distributed",
          "Web-to-Lead form capture",
          "Lead Rank / scoring",
          "Convert lead to job",
        ]}
      />
    </>
  );
}
