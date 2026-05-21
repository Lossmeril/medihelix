"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    close();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Hledat"
        className="p-2 text-dark hover:text-sky-600 transition-colors"
      >
        <MagnifyingGlassIcon className="size-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Vyhledávání"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={submit} className="flex items-center gap-3 px-5 py-4">
              <MagnifyingGlassIcon className="size-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Hledat přístroje, rychlotesty, výrobce…"
                className="flex-1 text-base text-dark outline-none placeholder-gray-400"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Zavřít hledání"
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="size-5" />
              </button>
            </form>
            {query.trim() && (
              <div className="border-t border-gray-100 px-5 py-2.5 text-sm text-gray-400">
                Stiskněte Enter pro zobrazení výsledků
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
