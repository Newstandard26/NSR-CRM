"use client";

import { useActionState } from "react";
import { inviteUser, type ActionResult } from "@/app/(app)/settings/team/actions";

const initial: ActionResult = { ok: false, message: "" };

export function InviteForm() {
  const [state, action, pending] = useActionState(
    async (_prev: ActionResult, formData: FormData) => inviteUser(formData),
    initial,
  );

  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <label className="flex-1">
        <span className="mb-1 block text-sm font-medium text-slate-700">
          Invite by email
        </span>
        <input
          name="email"
          type="email"
          required
          placeholder="name@newstandardrestoration.com"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send invite"}
      </button>
      {state.message && (
        <p
          className={`w-full text-sm ${state.ok ? "text-emerald-700" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
