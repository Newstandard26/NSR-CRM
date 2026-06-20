import { PageHeader, Placeholder } from "@/components/ui";

export default function ReportsPage() {
  return (
    <>
      <PageHeader title="ReportsPlus" subtitle="Reports & dashboards" />
      <Placeholder
        title="Custom reporting"
        phase="Phase 10"
        description="A report and dashboard library with scheduled delivery and pipeline/KPI analytics."
        bullets={[
          "Report & dashboard library",
          "Scheduled report delivery",
          "Pipeline value by stage",
          "KPIs across locations",
        ]}
      />
    </>
  );
}
