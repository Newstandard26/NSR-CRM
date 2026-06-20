"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import type { Location } from "@/lib/types";
import { setActiveLocation } from "@/app/actions/location";

export function LocationSwitcher({
  locations,
  active,
}: {
  locations: Location[];
  active: Location | null;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function choose(id: string) {
    setOpen(false);
    startTransition(() => setActiveLocation(id));
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-300"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded bg-brand-600 text-[10px] font-bold text-white">
          {active?.code ?? active?.name?.slice(0, 2).toUpperCase() ?? "··"}
        </span>
        <span className="max-w-[160px] truncate">
          {active?.name ?? "Select location"}
        </span>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 z-30 mt-1 w-64 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            Locations
          </p>
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => choose(loc.id)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                active?.id === loc.id ? "font-semibold text-brand-700" : "text-slate-700"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                {loc.code ?? loc.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="flex-1 truncate">{loc.name}</span>
              {loc.is_parent && (
                <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] text-brand-700">
                  Parent
                </span>
              )}
              {loc.is_training && (
                <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">
                  Training
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
