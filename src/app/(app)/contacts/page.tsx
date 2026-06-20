import { PageHeader, Placeholder } from "@/components/ui";

export default function ContactsPage() {
  return (
    <>
      <PageHeader title="Contacts" subtitle="Customers, spouses, and general contacts" />
      <Placeholder
        title="Contact management"
        phase="Phase 2"
        description="Full contact records with multiple phones/emails (text opt-in), contact types, custom fields, notes, and a per-contact activity log."
        bullets={[
          "Create / edit / search contacts",
          "Customer, Spouse, General + job roles",
          "Multiple phones & emails with text opt-in",
          "Custom fields and per-contact history",
        ]}
      />
    </>
  );
}
