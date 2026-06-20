import { PageHeader, Placeholder } from "@/components/ui";

export default function TrackPage() {
  return (
    <>
      <PageHeader
        title="Track"
        subtitle="Cross-job operational trackers"
      />
      <Placeholder
        title="Tracking views"
        phase="Phases 4–9"
        description="Company-wide trackers that slice jobs by operational dimension — each lands as its underlying domain ships."
        bullets={[
          "Job Progress · Signatures · Work Schedule",
          "Invoices · Payments · Disputes",
          "Supplements · Mortgage Checks · Permits",
          "Commissions · Financing Offers",
        ]}
      />
    </>
  );
}
