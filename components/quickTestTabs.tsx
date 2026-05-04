"use client";

import { useState } from "react";
import type { QuickTestGroup } from "@/utils/getQuickTest";

export function QuickTestTabs({ groups }: { groups: QuickTestGroup[] }) {
  const filledGroups = groups.filter((g) => g.items.length > 0);
  const [active, setActive] = useState(0);

  if (filledGroups.length === 0) return null;

  const group = filledGroups[active];
  const hasSpecimen = group.items.some((i) => i.specimen);
  const hasFormat   = group.items.some((i) => i.format);
  const hasCutOff   = group.items.some((i) => i.cut_off);
  const hasCeMark   = group.items.some((i) => i.ce_mark);
  const hasNote     = group.items.some((i) => i.note);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Katalog produktů</h2>

      {filledGroups.length > 1 && (
        <div className="flex flex-wrap border-b border-gray-200 mb-0">
          {filledGroups.map((g, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                idx === active
                  ? "border-sky-600 text-sky-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-x-auto border border-gray-200 rounded-b-md">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-xs uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3 font-semibold">Produkt</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">Kat. číslo</th>
              {hasSpecimen && <th className="px-4 py-3 font-semibold">Vzorek</th>}
              {hasFormat   && <th className="px-4 py-3 font-semibold">Formát</th>}
              {hasCutOff   && <th className="px-4 py-3 font-semibold">Cut-Off</th>}
              {hasNote     && <th className="px-4 py-3 font-semibold">Balení</th>}
              {hasCeMark   && <th className="px-4 py-3 font-semibold">CE</th>}
            </tr>
          </thead>
          <tbody>
            {group.items.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 last:border-0 even:bg-gray-50 hover:bg-sky-50 transition-colors"
              >
                <td className="px-4 py-2.5">{item.name}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-gray-700 whitespace-nowrap">
                  {item.cat_no}
                </td>
                {hasSpecimen && <td className="px-4 py-2.5 text-gray-600">{item.specimen ?? "—"}</td>}
                {hasFormat   && <td className="px-4 py-2.5 text-gray-600">{item.format ?? "—"}</td>}
                {hasCutOff   && <td className="px-4 py-2.5 text-gray-600">{item.cut_off ?? "—"}</td>}
                {hasNote     && <td className="px-4 py-2.5 text-gray-600">{item.note ?? "—"}</td>}
                {hasCeMark && (
                  <td className="px-4 py-2.5">
                    {item.ce_mark ? (
                      <span className="inline-block rounded bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">
                        {item.ce_mark}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
