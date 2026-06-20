"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUserContext } from "@/lib/context";

export type ActionResult = { ok: boolean; message: string };

/** Invite a user by email (Supabase Auth admin). Requires service role key. */
export async function inviteUser(formData: FormData): Promise<ActionResult> {
  const ctx = await getUserContext();
  if (!ctx?.isAdmin) return { ok: false, message: "Not authorized." };

  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { ok: false, message: "Email is required." };

  const admin = createAdminClient();
  if (!admin) {
    return {
      ok: false,
      message:
        "Invites require SUPABASE_SERVICE_ROLE_KEY to be set in the environment.",
    };
  }

  const origin = (await headers()).get("origin") ?? "";
  const { error } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/dashboard`,
  });
  if (error) return { ok: false, message: error.message };

  revalidatePath("/settings/team");
  return { ok: true, message: `Invitation sent to ${email}.` };
}

/** Assign (or change) a user's role at a given location. */
export async function setUserRole(
  userId: string,
  locationId: string,
  roleId: string,
): Promise<ActionResult> {
  const ctx = await getUserContext();
  if (!ctx?.isAdmin) return { ok: false, message: "Not authorized." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("user_location")
    .upsert(
      { user_id: userId, location_id: locationId, role_id: roleId },
      { onConflict: "user_id,location_id" },
    );
  if (error) return { ok: false, message: error.message };

  revalidatePath("/settings/team");
  return { ok: true, message: "Role updated." };
}
