import { PageHeader, Placeholder } from "@/components/ui";

export default function ProductionPage() {
  return (
    <>
      <PageHeader title="Production" subtitle="Scheduler & Order Manager" />
      <Placeholder
        title="Production tools"
        phase="Phases 4 & 10"
        description="Crew scheduling and material order management, including the ABC Supply integration."
        bullets={[
          "Production Scheduler",
          "Work schedule",
          "Order Manager",
          "ABC Supply material orders",
        ]}
      />
    </>
  );
}
