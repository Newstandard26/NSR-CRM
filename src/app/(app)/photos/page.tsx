import { PageHeader, Placeholder } from "@/components/ui";

export default function PhotosPage() {
  return (
    <>
      <PageHeader title="Photos" subtitle="Job photos & videos across locations" />
      <Placeholder
        title="Photos & Videos"
        phase="Phase 4"
        description="Tagged photo and video management backed by Supabase Storage, organized into albums and linked to jobs."
        bullets={[
          "Upload to Supabase Storage",
          "Tags & albums",
          "Linked to jobs",
          "Field capture from mobile (Phase 10)",
        ]}
      />
    </>
  );
}
