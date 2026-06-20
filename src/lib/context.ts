import { cookies } from "next/headers";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Location, UserContext } from "@/lib/types";

export const ACTIVE_LOCATION_COOKIE = "nsr_active_location";

/**
 * Resolves the signed-in user's profile, company, accessible locations,
 * roles, and the currently selected ("active") location. Cached per request.
 * Returns null when there is no authenticated user.
 */
export const getUserContext = cache(async (): Promise<UserContext | null> => {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  if (!authUser) return null;

  const { data: profile } = await supabase
    .from("app_user")
    .select("id, company_id, full_name, email, phone, is_active")
    .eq("id", authUser.id)
    .maybeSingle();

  const { data: company } = profile?.company_id
    ? await supabase
        .from("company")
        .select("id, name")
        .eq("id", profile.company_id)
        .maybeSingle()
    : { data: null };

  const { data: locations } = await supabase
    .from("location")
    .select(
      "id, company_id, name, code, is_parent, is_training, job_number_prefix, sort_order, is_active",
    )
    .order("sort_order");

  // Roles held by this user (across their assigned locations).
  const { data: roleRows } = await supabase
    .from("user_location")
    .select("role:role_id(slug)")
    .eq("user_id", authUser.id);

  const roleSlugs = Array.from(
    new Set(
      (roleRows ?? [])
        .map((r) => (r.role as { slug?: string } | null)?.slug)
        .filter((s): s is string => Boolean(s)),
    ),
  );
  const isAdmin = roleSlugs.includes("company_administrator");

  const locs = (locations ?? []) as Location[];
  const cookieStore = await cookies();
  const activeId = cookieStore.get(ACTIVE_LOCATION_COOKIE)?.value;
  const activeLocation =
    locs.find((l) => l.id === activeId) ??
    locs.find((l) => l.is_parent) ??
    locs[0] ??
    null;

  return {
    user: {
      id: authUser.id,
      company_id: profile?.company_id ?? null,
      full_name: profile?.full_name ?? authUser.email ?? null,
      email: profile?.email ?? authUser.email ?? null,
      phone: profile?.phone ?? null,
      is_active: profile?.is_active ?? true,
    },
    company: company ?? null,
    locations: locs,
    activeLocation,
    roleSlugs,
    isAdmin,
  };
});
