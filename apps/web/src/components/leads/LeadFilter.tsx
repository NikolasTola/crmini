"use client";

import { useRef, useState, useEffect } from "react";
import { FUNNEL_STAGES } from "@/lib/constants";
import { LeadStatus } from "@mini-crm/shared-types";

const INDICATOR_COLORS: Record<LeadStatus, string> = {
  novo:          "bg-blue-500",
  contato_feito: "bg-violet-500",
  qualificado:   "bg-yellow-500",
  proposta:      "bg-orange-500",
  fechado:       "bg-green-500",
  perdido:       "bg-red-400",
};

interface LeadFilterProps {
  activeStatuses: LeadStatus[];
  onToggle: (status: LeadStatus) => void;
  onClear: () => void;
  isPending: boolean;
}

export function LeadFilter({
  activeStatuses,
  onToggle,
  onClear,
  isPending,
}: LeadFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasFilter = activeStatuses.length > 0;

  const triggerLabel = hasFilter
    ? `${activeStatuses.length} status selecionado${activeStatuses.length > 1 ? "s" : ""}`
    : "Filtrar por status";

  return (
    <div className="flex items-center gap-3">
      {/* Dropdown trigger */}
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`
            flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-medium
            transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            ${open
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}
          `}
        >
          {/* Bolinhas dos status ativos */}
          {hasFilter && (
            <span className="flex items-center gap-1">
              {activeStatuses.map((s) => (
                <span key={s} className={`w-2 h-2 rounded-full ${INDICATOR_COLORS[s]}`} />
              ))}
            </span>
          )}

          {triggerLabel}

          {/* Chevron */}
          <svg
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown panel */}
        {open && (
          <div className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1.5">
            {FUNNEL_STAGES.map(({ status, label }) => {
              const checked = activeStatuses.includes(status);
              return (
                <label
                  key={status}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 cursor-pointer
                    transition-colors select-none text-sm
                    ${isPending ? "opacity-60 pointer-events-none" : "hover:bg-gray-50"}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(status)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600
                               focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${INDICATOR_COLORS[status]}`} />
                  <span className={checked ? "text-gray-900 font-medium" : "text-gray-600"}>
                    {label}
                  </span>
                </label>
              );
            })}

            {/* Rodapé do dropdown */}
            {hasFilter && (
              <>
                <div className="border-t border-gray-100 mt-1.5 pt-1.5 px-4 pb-1">
                  <button
                    onClick={() => { onClear(); setOpen(false); }}
                    disabled={isPending}
                    className="text-xs text-gray-400 hover:text-gray-700 transition-colors w-full text-left"
                  >
                    Limpar filtro
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}