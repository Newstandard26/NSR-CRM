import Link from "next/link";
import { signIn, signUp, requestPasswordReset } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    message?: string;
    mode?: string;
    redirectedFrom?: string;
  }>;
}) {
  const sp = await searchParams;
  const mode = sp.mode ?? "signin";
  const redirectedFrom = sp.redirectedFrom ?? "/dashboard";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-50 to-[#f6f8fb] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">
            NSR
          </div>
          <h1 className="text-xl font-semibold text-ink">
            New Standard Restoration
          </h1>
          <p className="text-sm text-muted">Operations CRM</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {sp.error && (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {sp.error}
            </p>
          )}
          {sp.message && (
            <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {sp.message}
            </p>
          )}

          {mode === "reset" ? (
            <form action={requestPasswordReset} className="space-y-4">
              <h2 className="text-base font-semibold">Reset your password</h2>
              <Field label="Email" name="email" type="email" required />
              <Submit>Send reset link</Submit>
              <p className="text-center text-sm text-muted">
                <Link href="/login" className="text-brand-600 hover:underline">
                  Back to sign in
                </Link>
              </p>
            </form>
          ) : mode === "signup" ? (
            <form action={signUp} className="space-y-4">
              <h2 className="text-base font-semibold">Create your account</h2>
              <Field label="Full name" name="full_name" type="text" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Password" name="password" type="password" required />
              <Submit>Create account</Submit>
              <p className="text-center text-sm text-muted">
                Already have an account?{" "}
                <Link href="/login" className="text-brand-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          ) : (
            <form action={signIn} className="space-y-4">
              <h2 className="text-base font-semibold">Sign in</h2>
              <input type="hidden" name="redirectedFrom" value={redirectedFrom} />
              <Field label="Email" name="email" type="email" required />
              <Field label="Password" name="password" type="password" required />
              <Submit>Sign in</Submit>
              <div className="flex items-center justify-between text-sm">
                <Link
                  href="/login?mode=reset"
                  className="text-muted hover:text-brand-600"
                >
                  Forgot password?
                </Link>
                <Link
                  href="/login?mode=signup"
                  className="text-brand-600 hover:underline"
                >
                  Create account
                </Link>
              </div>
            </form>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          The first account created becomes the Company Administrator.
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}

function Submit({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
    >
      {children}
    </button>
  );
}
