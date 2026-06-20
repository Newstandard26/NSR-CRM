/**
 * Supabase connection config.
 *
 * The URL and the *publishable* (anon) key are designed to be exposed to the
 * browser — access is governed by Row-Level Security, not key secrecy — so we
 * fall back to the project defaults when env vars are absent. Set
 * NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY to override (e.g.
 * to point at a different environment).
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://qpjswujpidkirshwirfw.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_qIVoBbkgL9YO7MYnDjH5cQ_BaRtg7tD";
